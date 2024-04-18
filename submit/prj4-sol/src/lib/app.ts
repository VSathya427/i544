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

  // constructor(wsUrl: string) {
  //   this.wsUrl = wsUrl;
  //   this.ws = makeLibraryWs(wsUrl);
  //   this.result = document.querySelector('#result');
  //   this.errors = document.querySelector('#errors');
  //   //TODO: add search handler
  // }
  constructor(wsUrl: string) {
    this.wsUrl = wsUrl;
    this.ws = makeLibraryWs(wsUrl);
    this.result = document.querySelector('#result');
    this.errors = document.querySelector('#errors');
    this.setupSearchHandler();
  }

  private setupSearchHandler() {
    const searchInput = document.querySelector('#search');
    searchInput.addEventListener('blur', () => {
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
      li.append(span, detailsLink);
      ul.append(li);
    });
    this.result.innerHTML = '';
    this.result.append(ul);
  }

  private displayScrollControls(links: NavLinks) {
    const scrollTop = makeElement('div', { class: 'scroll' });
    const scrollBottom = makeElement('div', { class: 'scroll' });

    if (links.prev) {
      const prevTopLink = makeElement('a', { rel: 'prev', href: '#' }, '<<');
      prevTopLink.addEventListener('click', (event) => {
        event.preventDefault();
        this.displaySearchResults(links.prev.href);
      });
      scrollTop.append(prevTopLink);

      const prevBottomLink = makeElement('a', { rel: 'prev', href: '#' }, '<<');
      prevBottomLink.addEventListener('click', (event) => {
        event.preventDefault();
        this.displaySearchResults(links.prev.href);
      });
      scrollBottom.append(prevBottomLink);
    }

    if (links.next) {
      const nextTopLink = makeElement('a', { rel: 'next', href: '#' }, '>>');
      nextTopLink.addEventListener('click', (event) => {
        event.preventDefault();
        this.displaySearchResults(links.next.href);
      });
      scrollTop.append(nextTopLink);

      const nextBottomLink = makeElement('a', { rel: 'next', href: '#' }, '>>');
      nextBottomLink.addEventListener('click', (event) => {
        event.preventDefault();
        this.displaySearchResults(links.next.href);
      });
      scrollBottom.append(nextBottomLink);
    }

    // Append the scroll controls before and after the search results
    this.result.prepend(scrollTop);
    this.result.append(scrollBottom);
  }

  
  //TODO: add private methods as needed

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
