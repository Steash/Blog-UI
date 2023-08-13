import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogpost } from 'src/app/features/blogpost/models/blogpost.model';
import { BlogpostService } from 'src/app/features/blogpost/services/blogpost.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<Blogpost[]>;

  constructor(private blogPostService: BlogpostService) {
  }
  
  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getAllBlogposts();
  }

}
