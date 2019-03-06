import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './shared/utils/constants';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ProductService } from './service/product.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public loadingRef: MatDialogRef<LoadingComponent>;
  public itemClass: string = Constants.PATH_PRODUCT;
  public showSearchAction: boolean =
    this.itemClass === Constants.PATH_PRODUCT;
  public showSearch  = false;
  public searchValue = '';
  public subscriptionFilter: Subscription;
  public subscriptionUrlChange: Subscription;
  public subscriptionSearch: Subscription;
  public subscriptionClass: Subscription;

  title = 'prj-store';

  @ViewChild('search')
  public productSearch: ElementRef;

  constructor(
    private router: Router,
    // private location = Location,
    private dialog: MatDialog,
    private productService: ProductService,

  ) { }

  public ngOnInit(): void {
    // this.location.subscribe(data => {
    //   if (data.type === 'popstate') {
    //       this.itemClass = data.url.split('/')[1];
    //   }
    // });

    // necessary to send data for screens filter data
    this.subscriptionFilter = this.productService.title$.subscribe(search => {
      this.searchValue = search;
    });

    // necessary to detect url change directly from browser
    this.subscriptionUrlChange = this.productService.url$.subscribe(search => {
      this.itemClass = search;
      this.showSearchComponents();
    });

    // set search component from other screens
    this.subscriptionSearch = this.productService.searchComponent$.subscribe(
      validate => {
        this.showSearchComponents();
      }
    );

    // set search component from other screens
    this.subscriptionClass = this.productService.cssClass$.subscribe(cssClass => {
      this.itemClass = cssClass;
      this.showSearchComponents();
    });
  }

  // public showInfo(item: string): void {
  //   console.log(item);
  //   this.showSearchComponents();
  //   this.router.navigate([item]);
  // }

  public showInfo(item: string): void {
    this.itemClass = item;
    this.showSearchComponents();
    this.router.navigate([Constants.PATH_HOME, this.itemClass]);
  }

  /**
   * startLoading: show global loading component
   */
  public startLoading(): void {
    setTimeout(() => {
      if (!this.dialog.getDialogById(Constants.DIALOG_LOADING_ID)) {
        this.loadingRef = this.dialog.open(LoadingComponent, {
          width: Constants.DIALOG_LOADING_WIDTH,
          id: Constants.DIALOG_LOADING_ID
        });
        this.loadingRef.disableClose = true;
      }
    }, 0);
  }

  /**
   * stopLoading: hides global loading component
   */
  public stopLoading(): void {
    setTimeout(() => {
      if (this.dialog.getDialogById(Constants.DIALOG_LOADING_ID)) {
        this.loadingRef.close();
      }
    }, 0);
  }

  public onKey(value: string): void {
    this.productService.searchData(value);
  }

  public onShowSearch(): void {
    this.showSearch = true;
    this.setSearchFocus();
  }

  public showSearchComponents(): void {
    // this.showSearchAction = this.hasToShowActionButtonsOnTopBar();
    this.showSearch = false;
    this.searchValue = '';
    this.productService.searchData('');
  }

 private setSearchFocus(): void {
    setTimeout(() => this.productSearch.nativeElement.focus(), 0);
  }
}
