import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  private AddBlogpostSubscription?: Subscription;
  categories$?: Observable<Category[]>;

  isImageSelectorVisible : boolean = false;
  imageSelectorSubscription?: Subscription;

  blogpostForm = new FormGroup({
    title: new FormControl('', Validators.required),
    shortDescription: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    featuredImageUrl: new FormControl(''),
    urlHandle: new FormControl('', Validators.required),
    publishedDate: new FormControl(null),
    author: new FormControl('', Validators.required),
    isVisible: new FormControl(false),
    categories: new FormArray([]),
  });


  constructor(private blogpostService: BlogpostService,
              private categoryService: CategoryService,
              // private imageService: ImageService,
              private router: Router) {}
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories(); 
  }

  onSubmit() {
    const formValue = this.blogpostForm.value;
    console.log(formValue);

    const blogpost: AddBlogpostRequest = {
      title: formValue.title || '',
      shortDescription: formValue.shortDescription || '',
      content: formValue.content || '',
      featuredImageUrl: formValue.featuredImageUrl || '',
      urlHandle: formValue.urlHandle || '',
      publishedDate: formValue.publishedDate || new Date(),
      author: formValue.author || '',
      isVisible: formValue.isVisible || false,
      categories: formValue.categories || [],
    };

    console.log(blogpost);

    this.AddBlogpostSubscription = this.blogpostService.createBlogpost(blogpost)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }

  get categoriesControl() {
    return this.blogpostForm.get('categories') as FormArray;
  }

  // Call this method when the select value changes
  onCategoriesChange(event: any) {
    const selectedCategories = event.target.options;
    this.categoriesControl.clear();

    for (let i = 0; i < selectedCategories.length; i++) {
      if (selectedCategories[i].selected) {
        this.categoriesControl.push(new FormControl(selectedCategories[i].value));
      }
    }
  }

  ngOnDestroy(): void {
    this.AddBlogpostSubscription?.unsubscribe();
  }

}
