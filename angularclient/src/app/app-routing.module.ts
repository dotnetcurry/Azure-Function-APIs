import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductsComponent } from './component/app.listproduct.component';
import { CreateProductComponent } from './component/app.createproduct.component';
import { EditProductComponent } from './component/app.editproduct.component';


const routes: Routes = [
  {path: '', component: ListProductsComponent},
  {path: 'create', component: CreateProductComponent},
  {path: 'edit/:id', component: EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
