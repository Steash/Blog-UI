import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { AddBlogpostComponent } from './features/blogpost/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blogpost/edit-blogpost/edit-blogpost.component';
import { BlogpostListComponent } from './features/blogpost/blogpost-list/blogpost-list.component';
import { HomeComponent } from './core/components/home/home.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    NavbarComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddBlogpostComponent,
    EditBlogpostComponent,
    BlogpostListComponent,
    HomeComponent,
    ImageSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
