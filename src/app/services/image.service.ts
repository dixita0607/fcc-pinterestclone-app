import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Image} from "../models/image";

@Injectable()
export class ImageService {

  constructor(private httpClient: HttpClient) {
  }

  getImages(): Observable<Object> {
    return this.httpClient.get<Image[]>('/api/images');
  }

  addImage(url: string, description?: string): Observable<Object> {
    return this.httpClient.post('/api/images', {url, description});
  }

  likeImage(imageId: string): Observable<Object> {
    return this.httpClient.put(`/api/images/${imageId}`, null);
  }

  deleteImage(imageId: string): Observable<Object> {
    return this.httpClient.delete(`/api/images/${imageId}`);
  }

}
