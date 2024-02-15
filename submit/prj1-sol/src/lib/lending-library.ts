import { Errors } from 'cs544-js-utils';
import { register } from 'module';
import { title } from 'process';

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
  // addBook(req: Record<string, any>): Errors.Result<XBook> {

  //   const validationError = validateAddBookRequest(req);
  //   if (validationError instanceof Errors.ErrResult) {
  //     return validationError;
  //   }
  
  //   return Errors.errResult('TODO');  //placeholder
  // }
  // Add book to library
  // addBook(req: Record<string, any>): Errors.Result<XBook> {

  //   // Validate request
  //   const validationResult = validateAddBookRequest(req);
  //   if (validationResult instanceof Errors.ErrResult) {
  //     return validationResult;
  //   }

  //   const book = req as XBook;

  //   // Check if book already exists
  //   // Check if book already exists
  //   if (this.books[book.isbn]) {
  //     const existing = this.books[book.isbn];
  //     console.log("EXOISSDSD");
  //     console.log(existing);
  //     if (existing.title !== book.title ||
  //       existing.authors.join(',') !== book.authors.join(',') ||
  //       existing.pages !== book.pages ||
  //       existing.year !== book.year ||
  //       existing.publisher !== book.publisher) {
  //       return Errors.errResult({
  //         code: 'BAD_REQ',
  //         message: `Inconsistent data for existing book ${book.isbn}`,
  //         widget: 'title' // or whichever field was inconsistent
  //       });

  //     }
  //   }

  //   // Add new words to index
  //   else {
  //     book.nCopies = 1;
  //     const words = getWords(book);
  //     words.forEach(word => {
  //       if (!this.wordIndex[word]) {
  //         this.wordIndex[word] = [];
  //       }
  //       this.wordIndex[word].push(book.isbn);
  //     });
  //   }

  //   // Add book 
  //   this.books[book.isbn] = book;

  //   return Errors.okResult(book);
  // }

  addBook(req: Record<string, any>): Errors.Result<XBook> {
    const validationError = validateAddBookRequest(req);
    if (validationError instanceof Errors.ErrResult) {
      return validationError;
    }

    const isbn = req.isbn;

    // Check if the book with the same ISBN already exists
    if (isbn in this.books) {
      const existingBook = this.books[isbn];

      // Validate information consistency
      if(req.title!== existingBook.title){
        const msg = 'Inconsistent title for an existing book with the same ISBN';
        return Errors.errResult(msg, { code: 'BAD_REQ', widget: 'title' });
      }
      if (!arraysEqual(req.authors, existingBook.authors)){
        const msg = 'Inconsistent author names for an existing book with the same ISBN';
        return Errors.errResult(msg, { code: 'BAD_REQ', widget: 'authors' });
      }
      if (req.pages !== existingBook.pages){
        const msg = 'Inconsistent pages for an existing book with the same ISBN';
        return Errors.errResult(msg, { code: 'BAD_REQ', widget: 'pages' });
      }
      if (req.year !== existingBook.year){
        const msg = 'Inconsistent year for an existing book with the same ISBN';
        return Errors.errResult(msg, { code: 'BAD_REQ', widget: 'year' });
      }
      if (req.publisher !== existingBook.publisher){
        const msg = 'Inconsistent publisher for an existing book with the same ISBN';
        return Errors.errResult(msg, { code: 'BAD_REQ', widget: 'publisher' });
      }
      // if (
      //   req.title !== existingBook.title ||
      //   !arraysEqual(req.authors, existingBook.authors) ||
      //   req.pages !== existingBook.pages ||
      //   req.year !== existingBook.year ||
      //   req.publisher !== existingBook.publisher
      // ) {
      //   const msg = 'Inconsistent data for an existing book with the same ISBN';
      //   return Errors.errResult(msg, { code: 'BAD_REQ', widget: 'isbn' });
      // }

      // Update the number of copies if nCopies is provided
      existingBook.nCopies = (req.nCopies !== undefined) ? (existingBook.nCopies || 1) + req.nCopies : (existingBook.nCopies || 1) + 1;

      return Errors.okResult(existingBook);
    }

    // If it's a new book, create a new book with nCopies if provided
    const newBook: XBook = {
      isbn: req.isbn,
      title: req.title,
      authors: req.authors,
      pages: req.pages,
      year: req.year,
      publisher: req.publisher,
      nCopies: req.nCopies !== undefined ? req.nCopies : 1  // Default to 1 if not provided
    };

    this.books[isbn] = newBook;
    updateWordIndex(newBook.title, newBook.authors, isbn, this.wordIndex);

    return Errors.okResult(newBook);
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
  // findBooks(req: Record<string, any>) : Errors.Result<XBook[]> {
  //   //TODO
  //   return Errors.errResult('TODO');  //placeholder
  // }
  findBooks(req: FindBooksReq): Errors.Result<XBook[]> {
    // Validate request
    if (!req || !isString(req.search)) {
      const msg = 'search field is missing or not a string';
      return Errors.errResult(msg, { code: 'BAD_TYPE', widget: 'search' });
    }

    // Trim leading and trailing spaces
    const trimmedSearch = req.search.trim();

    // Check for empty search string
    if (trimmedSearch === '') {
      const msg = 'search string must not be empty';
      return Errors.errResult(msg, { code: 'BAD_REQ', widget: 'search' });
    }

    // Extract search words
    const searchWords = extractDistinctWords([trimmedSearch]);

    // Check if there are any words in search
    if (searchWords.length === 0) {
      const msg = 'no words in search';
      return Errors.errResult(msg, { code: 'BAD_REQ', widget: 'search' });
    }

    // Compute matching ISBNs using JS Sets
    const matchingISBNs = searchWords.reduce((intersection, word) => {
      const wordIndexEntries = this.wordIndex[word.toLowerCase()] || [];
      const wordISBNs = new Set(wordIndexEntries);
      return new Set([...intersection].filter(isbn => wordISBNs.has(isbn)));
    }, new Set(Object.keys(this.books)));

    // Map matching ISBNs to books
    const matchingBooks = Array.from(matchingISBNs)
      .map(isbn => this.books[isbn])
      .sort((book1, book2) => book1.title.localeCompare(book2.title));

    return Errors.okResult(matchingBooks);
  }


  /** Set up patron req.patronId to check out book req.isbn. 
   * 
   *  Errors:
   *    MISSING: patronId or isbn field is missing
   *    BAD_TYPE: patronId or isbn field is not a string.
   *    BAD_REQ error on business rule violation.
   */
  // checkoutBook(req: Record<string, any>) : Errors.Result<void> {
  //   //TODO
  //   return Errors.errResult('TODO');  //placeholder
  // }
  checkoutBook(req: CheckoutBookReq): Errors.Result<void> {
    const errors: Errors.Err[] = [];

    // Validate request
    if (!req || !isString(req.patronId) || !isString(req.isbn)) {
      if (!isString(req.patronId)) {
        errors.push(new Errors.Err('property patronId is required', { code: 'MISSING', widget: 'patronId' }));
      }

      if (!isString(req.isbn)) {
        errors.push(new Errors.Err('property isbn is required', { code: 'MISSING', widget: 'isbn' }));
      }

     // errors.push(new Errors.Err('patronId or isbn field is not a string', { code: 'BAD_TYPE', widget: 'patronId' }));

      return new Errors.ErrResult(errors);
    }

    const { patronId, isbn } = req;

    // Check if the book with the given ISBN exists in the library
    if (!(isbn in this.books)) {
      errors.push(new Errors.Err(`unknown book ${isbn}`, { code: 'BAD_REQ', widget: 'isbn' }));
    }

    // Check if the patron has already checked out the same book
    if (this.booksCheckedOutByPatron[patronId]?.includes(isbn)) {
      errors.push(new Errors.Err(`patron ${patronId} already has book ${isbn} checked out`, { code: 'BAD_REQ', widget: 'isbn' }));
    }

    // Check if there are available copies of the book in the library
    if ((!this.books[isbn]?.nCopies || this.checkedOutBooks[isbn]?.length >= this.books[isbn]?.nCopies) && (isbn in this.books)) {
      errors.push(new Errors.Err(`no copies of book ${isbn} are available for checkout`, { code: 'BAD_REQ', widget: 'isbn' }));
    }

    // If there are errors, return them; otherwise, update data structures
    if (errors.length > 0) {
      return new Errors.ErrResult(errors);
    }

    // Update data structures to reflect the checkout
    if (!this.checkedOutBooks[isbn]) {
      this.checkedOutBooks[isbn] = [];
    }
    this.checkedOutBooks[isbn].push(patronId);

    if (!this.booksCheckedOutByPatron[patronId]) {
      this.booksCheckedOutByPatron[patronId] = [];
    }
    this.booksCheckedOutByPatron[patronId].push(isbn);

    return Errors.okResult(undefined);
  }

  /** Set up patron req.patronId to returns book req.isbn.
   *  
   *  Errors:
   *    MISSING: patronId or isbn field is missing
   *    BAD_TYPE: patronId or isbn field is not a string.
   *    BAD_REQ error on business rule violation.
   */
  // returnBook(req: Record<string, any>) : Errors.Result<void> {
  //   //TODO 
  //   return Errors.errResult('TODO');  //placeholder
  // }
  returnBook(req: ReturnBookReq): Errors.Result<void> {
    const errors: Errors.Err[] = [];

    // Validate request
    if (!req || typeof req.patronId !== 'string' || typeof req.isbn !== 'string') {
      if (typeof req.patronId !== 'string') {
        errors.push(new Errors.Err('property patronId is required', { code: 'MISSING', widget: 'patronId' }));
      }

      if (typeof req.isbn !== 'string') {
        errors.push(new Errors.Err('property isbn is required', { code: 'MISSING', widget: 'isbn' }));
      }

      errors.push(new Errors.Err('patronId or isbn field is not a string', { code: 'BAD_TYPE', widget: 'patronId' }));

      return new Errors.ErrResult(errors);
    }

    const { patronId, isbn } = req;

    // Check if the book with the given ISBN exists in the library
    if (!(isbn in this.books)) {
      errors.push(new Errors.Err(`unknown book ${isbn}`, { code: 'BAD_REQ', widget: 'isbn' }));
    }

    // Check if the patron has checked out the book
    if (!this.booksCheckedOutByPatron[patronId]?.includes(isbn)) {
      errors.push(new Errors.Err(`no checkout of book ${isbn} by patron ${patronId}`, { code: 'BAD_REQ', widget: 'isbn' }));
    }

    // If there are errors, return them; otherwise, update data structures
    if (errors.length > 0) {
      return new Errors.ErrResult(errors);
    }

    // Update data structures to reflect the return
    const patronIndex = this.booksCheckedOutByPatron[patronId].indexOf(isbn);
    this.booksCheckedOutByPatron[patronId].splice(patronIndex, 1);

    const bookIndex = this.checkedOutBooks[isbn].indexOf(patronId);
    this.checkedOutBooks[isbn].splice(bookIndex, 1);

    return Errors.okResult(undefined);
  }

  
}


/********************** Domain Utility Functions ***********************/


//TODO: add domain-specific utility functions or classes.

/********************* General Utility Functions ***********************/

//TODO: add general utility functions or classes.
function isString(value: any): value is string {
  return typeof value === 'string';
}

function validateAddBookRequest(req: Record<string, any>): Errors.Result<void> {

  const errors: Errors.Err[] = [];
  //console.log(req);
  // const requiredFields = ['title', 'authors', 'isbn', 'pages', 'year', 'publisher'];
  const requiredFields: string[] = ['title', 'authors', 'isbn', 'pages', 'year', 'publisher'];
  const missingFields: string[] = [];
  // Missing field check
  for (const field of requiredFields) {
    if (!(field in req)) {
      missingFields.push(field);
    }
  }
  if (missingFields.length > 0) {
    const errors: Errors.Err[] = missingFields.map((field) => {
      const msg = `property ${field} is required`;
      return new Errors.Err(msg, { code: 'MISSING', widget: field });
    });

    return new Errors.ErrResult(errors);
  }
  //String and Integer Validation
  if(req.authors.length == 0){
    const msg = 'authors must not be empty';
    errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'authors' }));
  }
  if (!Array.isArray(req.authors) || !req.authors.every(author => typeof author === 'string')) {
    const msg = 'authors must have type string[]';
    errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'authors' }));
  }


  if(!isString(req.title)){
    const msg = 'title must have type string';
    errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'title' }));
  }
  if(!isString(req.publisher)){
    const msg = 'publisher must have type string';
    errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'publisher' }));
  }
  if (!isString(req.isbn)) {
    const msg = 'isbn must have type string';
    errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'isbn' }));
  }


  const pages = req.pages;
  const year = req.year;
  const nCopies = req.nCopies;
  
  if (typeof pages === 'number' && !(pages > 0)) {
    const msg = `property pages must be > 0 `;
    errors.push(new Errors.Err(msg, { code: 'BAD_REQ', widget: 'pages' }));
  }

  if (typeof year === 'number' && !(year > 0)) {
    const msg = `property year must be > 0 `;
    errors.push(new Errors.Err(msg, { code: 'BAD_REQ', widget: 'year' }));
  }

  if (typeof pages !== 'number' || !Number.isInteger(pages)) {
    const msg = `property pages must be numeric`;
    errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'pages' }));
  }

  if (typeof year !== 'number' || !Number.isInteger(year)) {
    const msg = `property year must be numeric`;
    errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'year' }));
  }
  // if(isNaN(Number(pages))){
  //   const msg = `property pages must be numeric`;
  //   errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'pages' }));
  // }
  // if (isNaN(Number(year))){
  //   const msg = `property year must be numeric`;
  //   errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'year' }));
  // }

  const f = 'nCopies';
  if (f in req) {
    if (typeof nCopies === 'number' && !(nCopies > 0)) {
      const msg = 'propery nCopies must be > 0';
      errors.push(new Errors.Err(msg, { code: 'BAD_REQ', widget: 'nCopies' }));
    }
    if (typeof nCopies !== 'number' || !Number.isInteger(nCopies)) {
      if (!Number.isNaN(Number.parseFloat(nCopies))){
        const msg = `property nCopies must be numeric`;
        errors.push(new Errors.Err(msg, { code: 'BAD_REQ', widget: 'nCopies' }));
      }
      else{
        const msg = `property nCopies must be numeric`;
        errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'nCopies' }));
      }
    }
    // if (!Number.isInteger(nCopies)){
    //   const msg = `property nCopies must be numeric`;
    //   errors.push(new Errors.Err(msg, { code: 'BAD_TYPE', widget: 'nCopies' }));
    // }
  }
  //console.log(errors);
  return errors.length > 0 ? new Errors.ErrResult(errors) : Errors.okResult('TODO' as any);
}

function getWords(book: Book) {
  const words = new Set<string>();

  const regexp = /\w+/g;

  book.title.split(regexp).forEach(word => {
    if (word.length > 1) {
      words.add(word);
    }
  });

  book.authors.forEach(author => {
    author.split(regexp).forEach(word => {
      if (word.length > 1) {
        words.add(word);
      }
    });
  });

  return Array.from(words);
}
function updateWordIndex(title: string, authors: string[], isbn: ISBN, wordIndex: Record<string, ISBN[]>) {
  // Implement the logic to extract distinct words from title and authors
  const allWords: string[] = extractDistinctWords([title, ...authors]);

  // Update the word index with the ISBN for each word
  allWords.forEach(word => {
    if (!(word in wordIndex)) {
      wordIndex[word] = [];
    }
    if (!wordIndex[word].includes(isbn)) {
      wordIndex[word].push(isbn);
    }
  });
}

function extractDistinctWords(texts: string[]): string[] {
  // Implement the logic to extract distinct words from an array of texts
  const wordsSet = new Set<string>();
  texts.forEach(text => {
    const words = text.match(/\b\w{2,}\b/g);
    if (words) {
      words.forEach(word => wordsSet.add(word.toLowerCase()));
    }
  });

  return Array.from(wordsSet);
}

function arraysEqual(arr1: any[], arr2: any[]): boolean {
  // Implement a simple array equality check
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

