import * as mongo from 'mongodb';

import { Errors } from 'cs544-js-utils';

import * as Lib from './library.js';

//TODO: define any DB specific types if necessary
interface Book {
  isbn: string;
  title: string;
  authors: string[];
  pages: number;
  year: number;
  publisher: string;
  nCopies?: number;
}

interface Patron {
  patronId: string;
  isbn: string;
}

export async function makeLibraryDao(dbUrl: string) {
  return await LibraryDao.make(dbUrl);
}

//options for new MongoClient()
const MONGO_OPTIONS = {
  ignoreUndefined: true,  //ignore undefined fields in queries
};


export class LibraryDao {

  private client: mongo.MongoClient;
  private booksCollection: mongo.Collection<Book>;
  private checkoutsCollection: mongo.Collection<Patron>;

  //called by below static make() factory function with
  //parameters to be cached in this instance.
  constructor(client: mongo.MongoClient, booksCollection: mongo.Collection<Book>, checkoutsCollection: mongo.Collection<Patron>) {
    this.client = client;
    this.booksCollection = booksCollection;
    this.checkoutsCollection = checkoutsCollection;
  }

  //static factory function; should do all async operations like
  //getting a connection and creating indexing. Finally, it
  //should use the constructor to return an instance of this class.
  //returns error code DB on database errors.
  static async make(dbUrl: string): Promise<Errors.Result<LibraryDao>> {
    try {
      const client = await mongo.MongoClient.connect(dbUrl, MONGO_OPTIONS);
      const db = client.db();
      const booksCollection = db.collection<Book>('books');

      // Create indexes
      await booksCollection.createIndex({ title: 'text', authors: 'text' });
      const checkoutsCollection = db.collection<Patron>('checkouts');

      return Errors.okResult(new LibraryDao(client, booksCollection, checkoutsCollection));
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }

  async close(): Promise<Errors.Result<void>> {
    try {
      await this.client.close();
      return Errors.okResult(undefined);
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }

  //add methods as per your API
  async clearCollections(): Promise<Errors.Result<void>> {
    try {
      await this.booksCollection.deleteMany({});
      await this.checkoutsCollection.deleteMany({});
      return Errors.okResult(undefined);
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }

  async findBookByIsbn(isbn: string): Promise<Errors.Result<Lib.Book>> {
    try {
      const book = await this.booksCollection.findOne({ isbn });
      if (!book) {
        return Errors.errResult(`Book with ISBN ${isbn} not found`, 'NOT_FOUND');
      }
      return Errors.okResult(book);
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }


  async incrementBookCopies(isbn: string, nCopies: number): Promise<Errors.Result<void>> {
    try {
      const result = await this.booksCollection.updateOne(
        { isbn },
        { $inc: { nCopies: nCopies } }
      );
      if (result.modifiedCount === 0) {
        return Errors.errResult(`Failed to update book with ISBN ${isbn}`, 'DB');
      }
      return Errors.okResult(undefined);
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }

  async createBook(book: mongo.OptionalId<Book>): Promise<Errors.Result<void>> {
    try {
      const result = await this.booksCollection.insertOne(book);
      if (!result.insertedId) {
        return Errors.errResult(`Failed to create book with ISBN ${book.isbn}`, 'DB');
      }
      return Errors.okResult(undefined);
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }

  async findBooks(findQuery: any, index: number, count: number): Promise<Errors.Result<Lib.Book[]>> {
    try {
      const books = await this.booksCollection
        .find(findQuery)
        .sort({ title: 1 }) // Sort by title in ascending order
        .skip(index)
        .limit(count)
        .toArray();

      // Convert the authors field to an array of strings and exclude the _id field
      const formattedBooks = books.map((book) => ({
        isbn: book.isbn,
        title: book.title,
        authors: book.authors.map((author: any) => author.toString()),
        pages: book.pages,
        year: book.year,
        publisher: book.publisher,
        nCopies: book.nCopies,
      }));

      return Errors.okResult(formattedBooks);
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }

  async checkoutBook(isbn: string, patronId: string): Promise<Errors.Result<void>> {
    try {
      // Check if the book is available for checkout
      const bookResult = await this.findBookByIsbn(isbn);
      if (!bookResult.isOk) {
        return bookResult as Errors.Result<void>;
      }
      // Create a new checkout record
      const checkoutData = { patronId, isbn };
      const result = await this.checkoutsCollection.insertOne(checkoutData);
      if (!result.insertedId) {
        return Errors.errResult(`Failed to create checkout record for patron ${patronId} and book ${isbn}`, 'DB');
      }
      //this.printCheckoutsCollection();
      // Decrement the number of copies of the book
      await this.incrementBookCopies(isbn, -1);
      return Errors.okResult(undefined);
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }

  async returnBook(patronId: string, isbn: string): Promise<Errors.Result<void>> {
    try {
      // Check if the book is currently checked out
      const checkoutDetails = await this.getCheckoutDetails(patronId, isbn);
      if (!checkoutDetails.isOk || !checkoutDetails.val) {
        return Errors.errResult(`Book with ISBN ${isbn} is not checked out by patron with ID ${patronId}`, 'BAD_REQ');
      }

      // Remove the checkout record
      const returnData = { patronId, isbn };
      const deleteResult = await this.checkoutsCollection.deleteOne(returnData);
      if (deleteResult.deletedCount === 0) {
        return Errors.errResult(`Book with ISBN ${isbn} is not checked out by patron with ID ${patronId}`, 'BAD_REQ');
      }

      // Fetch the book document
      const bookResult = await this.findBookByIsbn(isbn);
      if (!bookResult.isOk) {
        return bookResult as Errors.Result<void>;
      }
      const book = bookResult.val;

      // Increment the number of copies of the book
      const updatedBook = {
        ...book,
        nCopies: book.nCopies ? book.nCopies + 1 : 1,
      };

      // Update the book document in the books collection
      await this.booksCollection.updateOne(
        { isbn: book.isbn },
        { $set: updatedBook }
      );

      return Errors.okResult(undefined);
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }

  async getCheckoutDetails(patronId: string, isbn: string): Promise<Errors.Result<Patron | null>> {
    try {
      const returnData = { patronId, isbn };
      const checkoutDetails = await this.checkoutsCollection.findOne(returnData);
      return Errors.okResult(checkoutDetails);
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }


  async printCheckoutsCollection(): Promise<void> {
    try {
      const checkouts = await this.checkoutsCollection.find().toArray();
      console.log("Checkouts Collection:");
      console.log(JSON.stringify(checkouts, null, 2));
    } catch (error) {
      console.error("Error printing checkouts collection:", error.message);
    }
  }

}


