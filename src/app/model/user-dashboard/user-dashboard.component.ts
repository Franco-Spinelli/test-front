import { Component, OnInit, ViewChild } from '@angular/core';
import { PlantDTO, SensorType } from '../../models';
import { PlantService } from '../../services/plant.service';
import { SensorService } from '../../services/sensor.service';
import { PlantFormComponent } from '../../plant-form/plant-form.component';
import { SensorFormComponent } from '../../sensor-form/sensor-form.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  userName:string;

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

  @ViewChild('plantModal') plantModal: PlantFormComponent;
  @ViewChild('sensorModal') sensorModal: SensorFormComponent;

  constructor(private plantService:PlantService, private sensorService:SensorService, private authService: AuthService){
    this.plants = []
  }
  ngOnInit(): void {
   this.loadPlants();
   this.loadUserData();
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
      this.loadNumbers();
    })
    this.plantService.getPlantUpdated().subscribe(() => {
      this.plantService.getPlants().subscribe((plants) => {
        this.plants = plants;
        this.loadNumbersBytype();
        this.loadNumbers();
      });
    });
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
  deletePlant(id:number){
    this.plantService.deletePlant(id).subscribe(()=>{
      
    })
  }
  openPlantModal() {
    this.plantModal.openCreate();
  }
  openEditPlantModal(plant: PlantDTO) {
    this.plantModal.openEdit(plant);
  }
  openSensorModal(plant:PlantDTO){
    this.sensorModal.openCreate(plant);
  }
  loadUserData(){
    this.authService.userInformation().subscribe((data)=>{
      console.log(data);
      this.userName = data.name;
    })
  }
}
