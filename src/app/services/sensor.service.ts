import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }
  
  getReadings(): Observable<number> {
    return this.http.get<number>(`${environment.urlApi}/sensor/get-readings`);
  }

  getMediumAlerts(): Observable<number> {
    return this.http.get<number>(`${environment.urlApi}/sensor/get-medium`);
  }

  getRedAlerts(): Observable<number> {
    return this.http.get<number>(`${environment.urlApi}/sensor/get-red`);
  }

  getDisabledSensors(): Observable<number> {
    return this.http.get<number>(`${environment.urlApi}/sensor/get-disabled`);
  }
}
