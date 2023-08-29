import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Result } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl: string = environment.API_URL;

  dataValue: any[] = [
    {showText: 'A', isActive: true},
    {showText: 'B', isActive: true},
    {showText: 'C', isActive: true},
    {showText: 'D', isActive: false},
    {showText: 'E', isActive: true},
    {showText: 'F', isActive: true},
    {showText: 'G', isActive: false},
    {showText: 'H', isActive: true},
    {showText: 'I', isActive: true},
  ];

  private dataSubject = new BehaviorSubject<any>(this.dataValue);
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetchResult(data: any): Observable<Result[]> {
    return this.http.post<Result[]>(this.apiUrl + "result", data)
    .pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }
    ));
  }
}
