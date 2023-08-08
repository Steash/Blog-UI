import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddBlogpostRequest } from '../models/add-blogpost-request.model';
import { UpdateBlogpostRequest } from '../models/update-blogpost-request.model';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) { }

  getAllBlogposts(): Observable<Blogpost[]> {
    return this.http.get<Blogpost[]>(`${environment.apiBaseUrl}/api/BlogPosts`);
  }

  getBlogpostById(id: string): Observable<Blogpost> {
    return this.http.get<Blogpost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}`);
  }

  createBlogpost(newBlogpost: AddBlogpostRequest): Observable<Blogpost> {
    return this.http.post<Blogpost>(`${environment.apiBaseUrl}/api/Blogposts`, newBlogpost);
  }

  updateBlogpost(id: string, updatedBlogpost: UpdateBlogpostRequest): Observable<Blogpost> {
    return this.http.put<Blogpost>(`${environment.apiBaseUrl}/api/Blogposts/${id}`, updatedBlogpost);
  }

  deleteBlogpost(id: string): Observable<Blogpost> {
    return this.http.delete<Blogpost>(`${environment.apiBaseUrl}/api/Blogposts/${id}`);
  }
}
