import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from 'src/app/shared/models/blog-image.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtension: '',
    fileName: '',
    title: '',
    url: ''
  });

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`);
  }

}
