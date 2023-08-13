import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { ImageService } from 'src/app/shared/components/image-selector/service/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogpostRequest;
  private AddBlogpostSubscription?: Subscription;
  categories$?: Observable<Category[]>;

  isImageSelectorVisible : boolean = false;
  imageSelectSubscription?: Subscription;

  constructor(private blogpostService: BlogpostService,
              private categoryService: CategoryService,
              private imageService: ImageService,
              private router: Router) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories(); 

    // Get image from image service
    this.imageSelectSubscription = this.imageService.onSelectImage()
    .subscribe({
      next: (response) => {
        if (this.model) {
          this.model.featuredImageUrl = response.url;
          this.closeImageSelector();
        }
      }
    })
  }

  onSubmit() {
    this.AddBlogpostSubscription = this.blogpostService.createBlogpost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }

  openImageSelector() {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.AddBlogpostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

}
