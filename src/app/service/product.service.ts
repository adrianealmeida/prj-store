import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   constructor() { }
// }

@Injectable()
export class ProductService {
  // Observable string sources
  private subjectSource = new Subject<string>();
  private titleSource = new Subject<string>();
  private classSource = new Subject<string>();
  private urlSource = new Subject<string>();
  private searchSource = new Subject<boolean>();

  // Observable string streams
  public subject$ = this.subjectSource.asObservable();
  public title$ = this.titleSource.asObservable();
  public searchComponent$ = this.searchSource.asObservable();
  public cssClass$ = this.classSource.asObservable();
  public url$ = this.urlSource.asObservable();

  constructor() {}

  // Service message commands
  public searchData(search: string): void {
    this.subjectSource.next(search);
  }

  public clearSearchData(): void {
    this.titleSource.next('');
  }

  public setUrlItem(item: string): void {
    this.urlSource.next(item);
  }

  public setClass(cssClass: string): void {
    this.classSource.next(cssClass);
  }

  public setSearch(): void {
    this.searchSource.next(true);
  }
}
