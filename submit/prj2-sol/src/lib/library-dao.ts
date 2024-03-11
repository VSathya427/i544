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
  private checkoutsCollection: mongo.Collection<{ patronId: string; isbn: string }>;

  //called by below static make() factory function with
  //parameters to be cached in this instance.
  constructor(client: mongo.MongoClient, booksCollection: mongo.Collection<Book>) {
    this.client = client;
    this.booksCollection = booksCollection;
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
      const checkoutsCollection = db.collection<{ patronId: string; isbn: string }>('checkouts');

      return Errors.okResult(new LibraryDao(client, booksCollection));
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
      // Clear any other collections you might have
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

  async checkoutBook(patronId: string, isbn: string): Promise<Errors.Result<void>> {
    try {
      // Check if the book is available for checkout
      const bookResult = await this.findBookByIsbn(isbn);
      if (!bookResult.isOk) {
        return bookResult as Errors.Result<void>;
      }
      const book = bookResult.val;
      if (book.nCopies === 0) {
        return Errors.errResult(`No copies of book with ISBN ${isbn} are available for checkout`, 'BAD_REQ');
      }

      // Check if the patron already has a copy of the book checked out
      const existingCheckout = await this.checkoutsCollection.findOne({ patronId, isbn });
      if (existingCheckout) {
        return Errors.errResult(`Patron with ID ${patronId} already has a copy of book with ISBN ${isbn} checked out`, 'BAD_REQ');
      }

      // Create a new checkout record
      await this.checkoutsCollection.insertOne({ patronId, isbn });

      // Decrement the number of copies of the book
      await this.incrementBookCopies(isbn, -1);

      return Errors.okResult(undefined);
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }

  
} 


