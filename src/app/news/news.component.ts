import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NewsService } from '../_services/news.service';
import { NewsResponse, Article } from '../_model/news/newsresponse';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles: Article[];
  constructor(public dialogRef: MatDialogRef<NewsComponent>, private newsService:NewsService) { }

  ngOnInit() {
    this.getNews();
 
  }

  refresh()
  {
    this.getNews();
  }

  getNews() {
    this.newsService.getAllHeadlines().subscribe(result =>
      {
        if(result.articles)
        {
          this.articles = result.articles;
        }
      })
  }

}
