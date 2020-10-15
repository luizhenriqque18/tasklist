import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  public pathUrl = `${environment.url}/task`;

  public createUsingPost(task: {title, status}): Observable<any> {
    return this.http.post(this.pathUrl, task);
  }

  public findAllUsingGet(): Observable<any> {
    return this.http.get(this.pathUrl);
  }
}
