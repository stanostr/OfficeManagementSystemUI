import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsResponse } from '../_model/news/newsresponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private static readonly API_KEY = '74170412961245baac34d0874e5b1438';
  private static readonly BASE_URL = 'https://newsapi.org/v2/top-headlines?'
  private sources = ['fox-news', 'breitbart-news', 'national-review', 'rt', 'the-times-of-india', 'the-washington-times', 'the-american-conservative'];
  constructor(private httpClient: HttpClient) {}

  public getAllHeadlines(): Observable<NewsResponse> {
    return this.httpClient.get<NewsResponse>(NewsService.BASE_URL + 'sources='  +
      this.sources.toString() + '&apiKey=' + NewsService.API_KEY);
  }
}
