import { Errors } from 'cs544-js-utils';

//types defined in library.ts in earlier projects
import * as Lib from 'library-types';


import { NavLinks, LinkedResult, PagedEnvelope, SuccessEnvelope }
  from './response-envelopes.js';

import { makeLibraryWs, LibraryWs } from './library-ws.js';

import { makeElement, makeQueryUrl } from './utils.js';

export default function makeApp(wsUrl: string) {
  return new App(wsUrl);
}


class App {
  private readonly wsUrl: string;
  private readonly ws: LibraryWs;

  private readonly result: HTMLElement;
  private readonly errors: HTMLElement;


  constructor(wsUrl: string) {
    this.wsUrl = wsUrl;
    this.ws = makeLibraryWs(wsUrl);
    this.result = document.querySelector('#result');
    this.errors = document.querySelector('#errors');
    this.setupSearchHandler();
  }


  //TODO: add private methods as needed
  private setupSearchHandler() {
    const searchInput = document.querySelector('#search');
    searchInput.addEventListener('blur', () => {
      this.result.innerHTML = "";
      this.clearErrors();
      const searchInput = document.querySelector('#search') as HTMLInputElement;
      const searchTerm = searchInput.value;
      console.log(searchTerm);
      const searchUrl = makeQueryUrl(this.wsUrl + '/api/books', { search: searchTerm });
      console.log('Search URL:', searchUrl);
      this.displaySearchResults(searchUrl);
    });
  }

  private async displaySearchResults(url: string | URL) {
    const result = await this.ws.findBooksByUrl(url);
    if (result.isOk === true) {
      this.clearErrors();
      const books = result.val.result;
      this.displayBooks(books);
      this.displayScrollControls(result.val.links);
    } else {
      this.clearErrors();
      displayErrors(result.errors);
    }
  }

  private displayBooks(books: LinkedResult<Lib.XBook>[]) {
    const ul = makeElement('ul', { id: 'search-results' });
    books.forEach(linkedResult => {
      const book = linkedResult.result;
      const li = makeElement('li');
      const span = makeElement('span', { class: 'content' }, book.title);
      const detailsLink = makeElement('a', { class: 'details' }, 'details...');
      detailsLink.addEventListener('click', (event) => {
        this.displayBookDetails(book);
        event.preventDefault();
        this.clearErrors();
      });
      li.append(span, detailsLink);
      ul.append(li);
    });
    this.result.innerHTML = '';
    this.result.append(ul);
  }

  private displayBookDetails(book: Lib.XBook) {

    const detailsContainer = makeElement('div', { id: 'result' });
    const dl = makeElement('dl', { class: 'book-details' });

    const isbnDt = makeElement('dt', {}, 'ISBN');
    const isbnDd = makeElement('dd', {}, book.isbn);
    dl.append(isbnDt, isbnDd);

    const titleDt = makeElement('dt', {}, 'Title');
    const titleDd = makeElement('dd', {}, book.title);
    dl.append(titleDt, titleDd);

    const authorsDt = makeElement('dt', {}, 'Authors');
    const authorsDd = makeElement('dd', {}, book.authors.join('; '));
    dl.append(authorsDt, authorsDd);

    const pagesDt = makeElement('dt', {}, 'Number of Pages');
    const pagesDd = makeElement('dd', {}, book.pages.toString());
    dl.append(pagesDt, pagesDd);

    const publisherDt = makeElement('dt', {}, 'Publisher');
    const publisherDd = makeElement('dd', {}, book.publisher);
    dl.append(publisherDt, publisherDd);

    const copiesDt = makeElement('dt', {}, 'Number of Copies');
    const copiesDd = makeElement('dd', {}, book.nCopies.toString());
    dl.append(copiesDt, copiesDd);

    const borrowersDt = makeElement('dt', {}, 'Borrowers');
    const borrowersDd = makeElement('dd', { id: 'borrowers' }, 'None');
    dl.append(borrowersDt, borrowersDd);

    detailsContainer.append(dl);
    this.result.innerHTML = '';
    this.result.append(detailsContainer);

    this.displayCheckoutForm(book.isbn);

    this.updateBorrowersList(book.isbn);
  }


  private displayCheckoutForm(isbn: string) {
    const formContainer = makeElement('form', { class: 'grid-form' });

    const label = makeElement('label', { for: 'patronId' }, 'Patron ID');
    const input = makeElement('input', { id: 'patronId' }) as HTMLInputElement;
    const errorSpan = makeElement('span', { class: 'error', id: 'patronId-error' });
    formContainer.append(label, input, errorSpan);

    const submitButton = makeElement('button', { type: 'submit' }, 'Checkout Book');
    formContainer.append(submitButton);

    formContainer.addEventListener('submit', async (event) => {
      event.preventDefault();
      const patronId = (document.querySelector('#patronId') as HTMLInputElement).value;
      const lends: Lib.Lend = {
        isbn,
        patronId: patronId,
      };
      const result = await this.ws.checkoutBook(lends);
      if (result.isOk) {
        this.clearErrors();
        this.updateBorrowersList(isbn);
      } else if (result.isOk == false) {
        this.clearErrors();
        displayErrors(result.errors);
      }
    });

    this.result.append(formContainer);
  }


  private async updateBorrowersList(isbn: string) {
    const borrowersContainer = document.querySelector('#borrowers') as HTMLElement;
    borrowersContainer.innerHTML = '';

    const result = await this.ws.getLends(isbn);
    if (result.isOk) {
      const lends = result.val || [];
      if (lends.length === 0) {
        borrowersContainer.textContent = 'None';
      } else {
        const ul = makeElement('ul');
        for (const lend of lends) {
          const li = makeElement('li');
          const span = makeElement('span', { class: 'content' }, lend.patronId);
          const button = makeElement('button', { class: 'return-book' }, 'Return Book');
          button.addEventListener('click', async () => {
            this.clearErrors();
            const returnResult = await this.ws.returnBook(lend);
            if (returnResult.isOk) {
              li.remove();
            } else if(returnResult.isOk == false){
              displayErrors(returnResult.errors);
            }
          });
          li.append(span, button);
          ul.append(li);
        }
        borrowersContainer.append(ul);
      }
    } else if (result.isOk == false) {
      this.clearErrors();
      displayErrors(result.errors);
    }
  }
  
  private displayScrollControls(links: NavLinks) {
    const scrollTop = makeElement('div', { class: 'scroll' });
    const scrollBottom = makeElement('div', { class: 'scroll' });

    if (links.prev) {
      const prevTopLink = makeElement('a', { rel: 'prev', href: '#' }, '<<');
      prevTopLink.addEventListener('click', (event) => {
        this.clearErrors();
        event.preventDefault();
        this.displaySearchResults(links.prev.href);
      });
      scrollTop.append(prevTopLink);

      const prevBottomLink = makeElement('a', { rel: 'prev', href: '#' }, '<<');
      prevBottomLink.addEventListener('click', (event) => {
        this.clearErrors();
        event.preventDefault();
        this.displaySearchResults(links.prev.href);
      });
      scrollBottom.append(prevBottomLink);
    }

    if (links.next) {
      const nextTopLink = makeElement('a', { rel: 'next', href: '#' }, '>>');
      nextTopLink.addEventListener('click', (event) => {
        this.clearErrors();
        event.preventDefault();
        this.displaySearchResults(links.next.href);
      });
      scrollTop.append(nextTopLink);

      const nextBottomLink = makeElement('a', { rel: 'next', href: '#' }, '>>');
      nextBottomLink.addEventListener('click', (event) => {
        this.clearErrors();
        event.preventDefault();
        this.displaySearchResults(links.next.href);
      });
      scrollBottom.append(nextBottomLink);
    }

    // Append the scroll controls before and after the search results
    this.result.prepend(scrollTop);
    this.result.append(scrollBottom);
  }


  /** unwrap a result, displaying errors if !result.isOk, 
   *  returning T otherwise.   Use as if (unwrap(result)) { ... }
   *  when T !== void.
   */
  private unwrap<T>(result: Errors.Result<T>) {
    if (result.isOk === false) {
      displayErrors(result.errors);
    }
    else {
      return result.val;
    }
  }

  /** clear out all errors */
  private clearErrors() {
    this.errors.innerHTML = '';
    document.querySelectorAll(`.error`).forEach( el => {
      el.innerHTML = '';
    });
  }

} //class App

/** Display errors. If an error has a widget or path widgetId such
 *  that an element having ID `${widgetId}-error` exists,
 *  then the error message is added to that element; otherwise the
 *  error message is added to the element having to the element having
 *  ID `errors` wrapped within an `<li>`.
 */  
function displayErrors(errors: Errors.Err[]) {
  for (const err of errors) {
    const id = err.options.widget ?? err.options.path;
    const widget = id && document.querySelector(`#${id}-error`);
    if (widget) {
      widget.append(err.message);
    }
    else {
      const li = makeElement('li', {class: 'error'}, err.message);
      document.querySelector(`#errors`)!.append(li);
    }
  }
}

//TODO: add functions as needed
