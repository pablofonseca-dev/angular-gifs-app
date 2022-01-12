import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../models/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey: string = '0XQckWLtcxID4sxE1Vg3goVXKIvUw3Vi';
  private serviceURL = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('gifsHistory')!) || [];
    this.results = JSON.parse(localStorage.getItem('gifsResults')!) || [];
  }

  searchGifs = (query: string) => {
    query = query.trim().toLowerCase();

    if (!this._history.includes(query)) {
      this._history = [query, ...this._history];
    }

    this._history = this._history.splice(0, 10);

    localStorage.setItem('gifsHistory', JSON.stringify(this._history));

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', 10)
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.serviceURL}/search`, { params })
      .subscribe((response) => {
        this.results = response.data;
        localStorage.setItem('gifsResults', JSON.stringify(response.data));
      });
  };
}
