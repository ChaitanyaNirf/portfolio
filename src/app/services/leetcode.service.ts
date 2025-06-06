import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../../constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class LeetcodeService {
  private apiUrl = 'https://portfolio-backend-eight-hazel.vercel.app/leetcode-data?username=';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + Constants.LEETCODE_USERNAME).pipe(
      map(response => response)
    );
  }
}
