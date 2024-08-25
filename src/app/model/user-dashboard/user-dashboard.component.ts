import { Component, OnInit } from '@angular/core';
import { PlantDTO } from '../../models';
import { PlantService } from '../../services/plant.service';
import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  plants:PlantDTO[];
  totalOkReadings: number = 0;
  totalMediumAlerts: number = 0;
  totalRedAlerts: number = 0;
  totalDisabled: number = 0;
  constructor(private plantService:PlantService, private sensorService:SensorService){
    this.plants = []
  }
  ngOnInit(): void {
   this.loadPlants();
   this.loadNumbers();
  }
  loadNumbers(){
    this.sensorService.getDisabledSensors().subscribe((data)=>{
      this.totalDisabled = data;
    })
    this.sensorService.getMediumAlerts().subscribe((data)=>{
      this.totalMediumAlerts = data;
    })
    this.sensorService.getReadings().subscribe((data)=>{
      this.totalOkReadings = data;
    })
    this.sensorService.getRedAlerts().subscribe((data)=>{
      this.totalRedAlerts = data;
    })
  }
  loadPlants(){
    this.plantService.getPlants().subscribe((data)=>{
      this.plants = data;
    })
  }
  calculateOkReadingsByPlant(plant:PlantDTO): number{
    let count = 0;
    plant.sensorSummaryDTOList.forEach(sensor=>{
      count = count + sensor.okReadings;
    })
    return count;
  }
  calculateMediumAlertsByPlant(plant:PlantDTO): number{
    let count = 0;
    plant.sensorSummaryDTOList.forEach(sensor=>{
      count = count + sensor.mediumAlerts;
    })
    return count;
  }
  calculateRedAlertsByPlant(plant:PlantDTO): number{
    let count = 0;
    plant.sensorSummaryDTOList.forEach(sensor=>{
      count = count + sensor.redAlerts;
    })
    return count;
  }
  
}
