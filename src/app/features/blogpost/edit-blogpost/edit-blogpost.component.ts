import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { Observable, Subscription } from 'rxjs';
import { UpdateBlogpostRequest } from '../models/update-blogpost-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogpostService } from '../services/blogpost.service';
import { Blogpost } from '../models/blogpost.model';
import { ImageService } from 'src/app/shared/components/image-selector/service/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: Blogpost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;

  routeSubscription?: Subscription;
  updateBlogpostSubscription?: Subscription;
  getBlogpostSubscription?: Subscription;
  deleteBlogpostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;

  constructor(private imageService: ImageService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private blogpostService: BlogpostService,
              private router: Router) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // Get Blogpost from API
        if (this.id) {
          this.getBlogpostSubscription; this.blogpostService.getBlogpostById(this.id)
          .subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
        }

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
    });
  }

  onFormSubmit(): void {
    // Convert this model to Request Object
    if (this.model && this.id) {
      var updateBlogpost: UpdateBlogpostRequest = {
        title: this.model.title,
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };

      this.updateBlogpostSubscription = this.blogpostService.updateBlogpost(this.id, updateBlogpost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
    
  }

  onDelete(): void {
    if (this.id) {
      this.deleteBlogpostSubscription = this.blogpostService.deleteBlogpost(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }  
  }

  openImageSelector(): void{
    this.isImageSelectorVisible = true; 
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
    this.getBlogpostSubscription?.unsubscribe(); 
    this.deleteBlogpostSubscription?.unsubscribe(); 
    this.updateBlogpostSubscription?.unsubscribe(); 
  }

}
