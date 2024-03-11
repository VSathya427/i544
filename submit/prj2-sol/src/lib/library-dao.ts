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

      return Errors.okResult(new LibraryDao(client, booksCollection));
    } catch (error) {
      return Errors.errResult(error.message, 'DB');
    }
  }

  /** close off this DAO; implementing object is invalid after call to close()
   * Error Codes: DB: a database error was encountered.
   */
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

  /**
   * Find a book by its ISBN.
   * @param isbn The ISBN of the book to find.
   * @returns A Result containing the book if found, or an error if not found.
   */
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

  /**
    * Increment the number of copies for a book by its ISBN.
    * @param isbn The ISBN of the book.
    * @param nCopies The number of copies to increment.
    * @returns A Result indicating success or an error.
    */
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

  /**
   * Create a new book entry in the database.
   * @param book The book to create.
   * @returns A Result indicating success or an error.
   */
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


} 


