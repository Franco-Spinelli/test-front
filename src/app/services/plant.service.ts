import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }

  getPlants(): Observable<any> {
    return this.http.get(`${environment.urlApi}/plant/get-plants`);
  }

  addPlant(plantDTO: any): Observable<any> {
    return this.http.post(`${environment.urlApi}/plant/add-plant`, plantDTO);
  }

  updatePlant(plantDTO: any): Observable<any> {
    return this.http.put(`${environment.urlApi}/plant/update-plant`, plantDTO);
  }

  deletePlant(id: number): Observable<any> {
    return this.http.delete(`${environment.urlApi}/plant/delete-plant/${id}`);
  }
}
