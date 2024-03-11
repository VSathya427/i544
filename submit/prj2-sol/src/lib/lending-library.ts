import { Errors } from 'cs544-js-utils';

import { LibraryDao } from './library-dao.js';
import * as Lib from './library.js';

interface Book {
  isbn: string;
  title: string;
  authors: string[];
  pages: number;
  year: number;
  publisher: string;
  nCopies?: number;
}
/** Note that errors are documented using the `code` option which must be
 *  returned (the `message` can be any suitable string which describes
 *  the error as specifically as possible).  Whenever possible, the
 *  error should also contain a `widget` option specifying the widget
 *  responsible for the error).
 *
 *  Note also that the underlying DAO should not normally require a
 *  sequential scan over all books or patrons.
 */


/************************ Main Implementation **************************/

export function makeLendingLibrary(dao: LibraryDao) {
  return new LendingLibrary(dao);
}

export class LendingLibrary {

  constructor(private readonly dao: LibraryDao) {
  }

  /** clear out underlying db */
  // async clear() : Promise<Errors.Result<void>> {
  //   return Errors.errResult('TODO');
  // }
  /** clear out underlying db */
  /** clear out underlying db */
  async clear(): Promise<Errors.Result<void>> {
    return await this.dao.clearCollections();
  }

  /** Add one-or-more copies of book represented by req to this library.
   *  If the book is already in the library and consistent with the book
   *  being added, then the nCopies of the book is simply updated by
   *  the nCopies of the object being added (default 1).
   *
   *  Errors:
   *    MISSING: one-or-more of the required fields is missing.
   *    BAD_TYPE: one-or-more fields have the incorrect type.
   *    BAD_REQ: other issues, like:
   *      "nCopies" or "pages" not a positive integer.
   *      "year" is not integer in range [1448, currentYear]
   *      "isbn" is not in ISBN-10 format of the form ddd-ddd-ddd-d
   *      "title" or "publisher" field is empty.
   *      "authors" array is empty or contains an empty author
   *      book is already in library but data in req is 
   *      inconsistent with the data already present.
   */
  // async addBook(req: Record<string, any>): Promise<Errors.Result<Lib.XBook>> {
  //   return Errors.errResult('TODO');
  // }
  // Assuming Lib.Book has properties isbn, title, authors, pages, year, publisher, and nCopies
  // and all are required except nCopies
async addBook(req: Record<string, any>): Promise<Errors.Result<Lib.Book>> {
  const bookResult = Lib.validate<Lib.Book>('addBook', req);
  if (!bookResult.isOk) {
    return bookResult;
  }

  const book = bookResult.val as Lib.Book;

  // Check if a book with the same ISBN already exists
  const existingBookResult = await this.dao.findBookByIsbn(book.isbn);
  if (existingBookResult.isOk) {
    const existingBook = existingBookResult.val;
    const diffField = compareBook(existingBook, book);
    if (diffField) {
      return Errors.errResult(`Book with ISBN ${book.isbn} already exists with different ${diffField}`, 'BAD_REQ');
    }
    await this.dao.incrementBookCopies(book.isbn, book.nCopies || 1);
    return Errors.okResult(existingBook);
  }


  // If all required properties are present, proceed to create the book
  await this.dao.createBook(book as Book);
  return Errors.okResult(book);
}


  /** Return all books whose authors and title fields contain all
   *  "words" in req.search, where a "word" is a max sequence of /\w/
   *  of length > 1.  Note that word matching must be case-insensitive,
   *  but can depend on any stemming rules of the underlying database.
   *  
   *  The req can optionally contain non-negative integer fields
   *  index (default 0) and count (default DEFAULT_COUNT).  The
   *  returned results are a slice of the sorted results from
   *  [index, index + count).  Note that this slicing *must* be
   *  performed by the database.
   *
   *  Returned books should be sorted in ascending order by title.
   *  If no books match the search criteria, then [] should be returned.
   *
   *  Errors:
   *    MISSING: search field is missing
   *    BAD_TYPE: search field is not a string or index/count are not numbers.
   *    BAD_REQ: no words in search, index/count not int or negative.
   */
  // async findBooks(req: Record<string, any>)
  //   : Promise<Errors.Result<Lib.XBook[]>>
  // {
  //   return Errors.errResult('TODO');
  // }

  async findBooks(req: Record<string, any>): Promise<Errors.Result<Lib.XBook[]>> {
    // Validate the request
    if (!req.search || typeof req.search !== 'string') {
      return Errors.errResult('Search field is missing or not a string', 'MISSING');
    }
    const index = req.index !== undefined ? parseInt(req.index) : 0;
    const count = req.count !== undefined ? parseInt(req.count) : DEFAULT_COUNT;
    if (isNaN(index) || isNaN(count) || index < 0 || count < 0) {
      return Errors.errResult('Index or count is not a number or is negative', 'BAD_REQ');
    }

    // Extract and format search terms
    const words = req.search.match(/\w{2,}/g);
    if (!words || words.length === 0) {
      return Errors.errResult('No words in search', 'BAD_REQ');
    }
    const searchQuery = words.map(word => `"${word}"`).join(' ');

    // Perform the search using the DAO
    try {
      const booksResult = await this.dao.findBooks({ $text: { $search: searchQuery } }, index, count);
      if (booksResult.isOk) {
        return Errors.okResult(booksResult.val);
      } else {
        // Assuming booksResult is an ErrResult, return it directly
        return booksResult;
      }
    } catch (error) {
      // Handle any errors that occur during the search
      return Errors.errResult('An error occurred while searching for books', 'INTERNAL_ERROR');
    }
  }


  /** Set up patron req.patronId to check out book req.isbn. 
   * 
   *  Errors:
   *    MISSING: patronId or isbn field is missing
   *    BAD_TYPE: patronId or isbn field is not a string.
   *    BAD_REQ: invalid isbn or error on business rule violation, like:
   *      isbn does not specify a book in the library
   *      no copies of the book are available for checkout
   *      patron already has a copy of the same book checked out
   */
  async checkoutBook(req: Record<string, any>) : Promise<Errors.Result<void>> {
    return Errors.errResult('TODO');
  }

  /** Set up patron req.patronId to returns book req.isbn.
   *  
   *  Errors:
   *    MISSING: patronId or isbn field is missing
   *    BAD_TYPE: patronId or isbn field is not a string.
   *    BAD_REQ: invalid isbn or error on business rule violation like
   *    isbn does not specify a book in the library or there is
   *    no checkout of the book by patronId.
   */
  async returnBook(req: Record<string, any>) : Promise<Errors.Result<void>> {
    return Errors.errResult('TODO');
  }

  //add class code as needed

}

// default count for find requests
const DEFAULT_COUNT = 5;

//add file level code as needed
  

/********************** Domain Utility Functions ***********************/

/** return a field where book0 and book1 differ; return undefined if
 *  there is no such field.
 */
function compareBook(book0: Lib.Book, book1: Lib.Book) : string|undefined {
  if (book0.title !== book1.title) return 'title';
  if (book0.authors.some((a, i) => a !== book1.authors[i])) return 'authors';
  if (book0.pages !== book1.pages) return 'pages';
  if (book0.year !== book1.year) return 'year';
  if (book0.publisher !== book1.publisher) return 'publisher';
}



