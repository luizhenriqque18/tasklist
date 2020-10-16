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

  public createUsingPost(task: {title, description}): Observable<any> {
    return this.http.post(this.pathUrl, task);
  }

  public updateUsingPut(task: {id, title, description}): Observable<any> {
    return this.http.put(`${this.pathUrl}?idTask=${task.id}`, task);
  }

  public deleteAllUsingDelete(id: string): Observable<any> {
    return this.http.delete(`${this.pathUrl}/${id}`);
  }

  public findAllUsingGet(): Observable<any> {
    return this.http.get(this.pathUrl);
  }

  public changeStatusUsingPut(task: {id}): Observable<any> {
    return this.http.put(`${this.pathUrl}/changeStatus?idTask=${task.id}`, { });
  }
}
