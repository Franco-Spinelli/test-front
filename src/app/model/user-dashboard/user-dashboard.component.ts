import { Component, OnInit } from '@angular/core';
import { PlantDTO, SensorType } from '../../models';
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

  totalTemperatureValues: any;
  totalPressureValues: any;
  totalWindValues: any;
  totalLevelsValues: any;
  totalEnergyValues: any;
  totalTensioneValues: any;
  totalCarbonMonoxideValues: any;
  totalGasesValues: any;
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
      this.loadNumbersBytype();
    })
  }
  loadNumbersBytype(){
    this.totalTemperatureValues = this.calculateTotalByType(SensorType.TEMPERATURE);
    this.totalPressureValues= this.calculateTotalByType(SensorType.PRESSURE);
    this.totalWindValues= this.calculateTotalByType(SensorType.WIND);
    this.totalLevelsValues= this.calculateTotalByType(SensorType.LEVELS);
    this.totalEnergyValues= this.calculateTotalByType(SensorType.ENERGY);
    this.totalTensioneValues= this.calculateTotalByType(SensorType.TENSION);
    this.totalCarbonMonoxideValues= this.calculateTotalByType(SensorType.CARBON_MONOXIDE);
    this.totalGasesValues= this.calculateTotalByType(SensorType.OTHER_GASES);
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
  calculateTotalByType(type:SensorType): any{
    const totalAlerts: any = {
      okReadings: 0,
      mediumAlerts: 0,
      redAlerts: 0,
    };
    this.plants.forEach(plant => {
      plant.sensorSummaryDTOList.forEach(sensorSummary => {
        if (sensorSummary.type === type) {
          totalAlerts.okReadings += sensorSummary.okReadings;
          totalAlerts.mediumAlerts += sensorSummary.mediumAlerts;
          totalAlerts.redAlerts += sensorSummary.redAlerts;
        }
      });
    });

    return totalAlerts;
  }
}
