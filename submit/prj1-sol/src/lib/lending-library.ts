import { Errors } from 'cs544-js-utils';

/** Note that errors are documented using the `code` option which must be
 *  returned (the `message` can be any suitable string which describes
 *  the error as specifically as possible).  Whenever possible, the
 *  error should also contain a `widget` option specifying the widget
 *  responsible for the error).
 *
 *  Note also that none of the function implementations should normally
 *  require a sequential scan over all books or patrons.
 */

/******************** Types for Validated Requests *********************/

/** used as an ID for a book */
type ISBN = string; 

/** used as an ID for a library patron */
type PatronId = string;

export type Book = {
  isbn: ISBN;
  title: string;
  authors: string[];
  pages: number;      //must be int > 0
  year: number;       //must be int > 0
  publisher: string;
  nCopies?: number;   //# of copies owned by library; not affected by borrows;
                      //must be int > 0; defaults to 1
};

export type XBook = Required<Book>;

type AddBookReq = Book;
type FindBooksReq = { search: string; };
type ReturnBookReq = { patronId: PatronId; isbn: ISBN; };
type CheckoutBookReq = { patronId: PatronId; isbn: ISBN; };

/************************ Main Implementation **************************/

export function makeLendingLibrary() {
  return new LendingLibrary();
}

export class LendingLibrary {

  //TODO: declare private TS properties for instance
  private books: Record<ISBN, XBook>;
  private wordIndex: Record<string, ISBN[]>;
  private checkedOutBooks: Record<ISBN, PatronId[]>;
  private booksCheckedOutByPatron: Record<PatronId, ISBN[]>;
  
  constructor() {
    //TODO: initialize private TS properties for instance
    this.books = {};
    this.wordIndex = {};
    this.checkedOutBooks = {};
    this.booksCheckedOutByPatron = {};
  }

  /** Add one-or-more copies of book represented by req to this library.
   *
   *  Errors:
   *    MISSING: one-or-more of the required fields is missing.
   *    BAD_TYPE: one-or-more fields have the incorrect type.
   *    BAD_REQ: other issues like nCopies not a positive integer 
   *             or book is already in library but data in obj is 
   *             inconsistent with the data already present.
   */
  addBook(req: Record<string, any>): Errors.Result<XBook> {
    const requiredFields: string[] = ['title', 'authors', 'isbn', 'pages', 'year', 'publisher'];
    const missingFields: string[] = [];

    for (const field of requiredFields) {
      if (!(field in req)) {
        missingFields.push(field);
      }
    }
    if (missingFields.length > 0) {
      const errors: Errors.Err[] = missingFields.map((field) => {
        const msg = `property ${field} is required;`;
        return new Errors.Err(msg, { code: 'MISSING', widget: field });
      });

      return new Errors.ErrResult(errors);
    }

    const validationError = validateAddBookRequest(req);
    if (validationError instanceof Errors.ErrResult) {
      return validationError;
    }
  
    return Errors.errResult('TODO');  //placeholder
  }


  

  /** Return all books matching (case-insensitive) all "words" in
   *  req.search, where a "word" is a max sequence of /\w/ of length > 1.
   *  Returned books should be sorted in ascending order by title.
   *
   *  Errors:
   *    MISSING: search field is missing
   *    BAD_TYPE: search field is not a string.
   *    BAD_REQ: no words in search
   */
  findBooks(req: Record<string, any>) : Errors.Result<XBook[]> {
    //TODO
    return Errors.errResult('TODO');  //placeholder
  }


  /** Set up patron req.patronId to check out book req.isbn. 
   * 
   *  Errors:
   *    MISSING: patronId or isbn field is missing
   *    BAD_TYPE: patronId or isbn field is not a string.
   *    BAD_REQ error on business rule violation.
   */
  checkoutBook(req: Record<string, any>) : Errors.Result<void> {
    //TODO
    return Errors.errResult('TODO');  //placeholder
  }

  /** Set up patron req.patronId to returns book req.isbn.
   *  
   *  Errors:
   *    MISSING: patronId or isbn field is missing
   *    BAD_TYPE: patronId or isbn field is not a string.
   *    BAD_REQ error on business rule violation.
   */
  returnBook(req: Record<string, any>) : Errors.Result<void> {
    //TODO 
    return Errors.errResult('TODO');  //placeholder
  }
  
}


/********************** Domain Utility Functions ***********************/


//TODO: add domain-specific utility functions or classes.

/********************* General Utility Functions ***********************/

//TODO: add general utility functions or classes.
function validateAddBookRequest(req: Record<string, any>): Errors.Result<void> {

  const errors: Errors.Err[] = [];

  const requiredFields = ['title', 'authors', 'isbn', 'pages', 'year', 'publisher'];

  if (!Array.isArray(req.authors) || !req.authors.every(author => typeof author === 'string')) {
    const msg = 'BAD_TYPE: authors must have type string[]; widget=authors';
    errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'authors' }));
  }

  const pages = req.pages;
  const year = req.year;

  if (typeof pages !== 'number' || !Number.isInteger(pages) || pages <= 0) {
    const msg = `BAD_TYPE: property pages must be numeric and > 0; widget=pages`;
    errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'pages' }));
  }

  if (typeof year !== 'number' || !Number.isInteger(year) || year <= 0) {
    const msg = `BAD_TYPE: property year must be numeric and > 0; widget=year`;
    errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'year' }));
  }

  return errors.length > 0 ? new Errors.ErrResult(errors) : Errors.okResult('TODO' as any);

}