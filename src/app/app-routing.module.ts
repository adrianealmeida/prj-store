import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'about', component: AboutComponent},
  // tinha isso dentro de about, ver depois ->> , canActivate: [TesteGuard]
  { path: '', component: ProductsComponent },
  { path: '**', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
