import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ListProductsComponent } from './component/app.listproduct.component';
import { CreateProductComponent } from './component/app.createproduct.component';
import { EditProductComponent } from './component/app.editproduct.component';
@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent, CreateProductComponent, EditProductComponent
  ],
  imports: [
    BrowserModule, FormsModule,  HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
