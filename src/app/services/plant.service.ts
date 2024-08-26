import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private plantUpdated = new Subject<void>();
  constructor(private http: HttpClient) { }

  getPlants(): Observable<any> {
    return this.http.get(`${environment.urlApi}/plant/get-plants`);
  }

  addPlant(plantDTO: any): Observable<any> {
    return this.http.post(`${environment.urlApi}/plant/add-plant`, plantDTO).pipe(
      tap(()=>this.plantUpdated.next())
    );;
  }

  updatePlant(plantDTO: any): Observable<any> {
    return this.http.put(`${environment.urlApi}/plant/update-plant`, plantDTO).pipe(
      tap(()=>this.plantUpdated.next())
    );;
  }

  deletePlant(id: number): Observable<any> {
    return this.http.delete(`${environment.urlApi}/plant/delete-plant/${id}`).pipe(
      tap(()=>this.plantUpdated.next())
    );
  }
  getPlantUpdated(): Observable<void> {
    return this.plantUpdated.asObservable();
  }
}
