import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../blogpost/services/blogpost.service';
import { Blogpost } from '../../blogpost/models/blogpost.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  url: string | null = null;
  blogpost$?: Observable<Blogpost>;

  constructor(private route: ActivatedRoute,
    private blogpostService: BlogpostService) {
  }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe({
      next: (params) => {
        this.url = params.get('url');
      }
    });

    // Fetch blog details by url
    if (this.url) {
      this.blogpost$ = this.blogpostService.getBlogpostByUrlHandle(this.url);
    }
  }
}
