import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
 private countryUrl = 'https://countriesnow.space/api/v0.1/countries/states'
  constructor(private http: HttpClient) { }
  getCountries(): Observable<any> {
    return this.http.get<any>(this.countryUrl);
  }
}
