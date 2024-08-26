import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantService } from '../services/plant.service';
import { PlantDTO, SensorSummaryDTO } from '../models';
import { GeoService } from '../services/geo.service';
import { SensorFormComponent } from '../sensor-form/sensor-form.component';
import { log } from 'console';
import { SensorService } from '../services/sensor.service';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrl: './plant-form.component.css'
})
export class PlantFormComponent implements OnInit{
  plantForm: FormGroup;
  sensorList: SensorSummaryDTO [] = [] ;
  plant: PlantDTO;
  countries: any[];
  isOpen = false;
  isUpdate = false;
  @ViewChild('sensorModal') sensorModal: SensorFormComponent;
  constructor(private formBuilder: FormBuilder, private plantService: PlantService,private geoService: GeoService, private sensorService:SensorService){}
  ngOnInit(): void {
    
    this.plantForm =  this.formBuilder.group({
      id:'',
      name:  ['',[Validators.required]],
      country: [,[Validators.required]],
    });
    this.loadCountries();
  }
  onSubmit(): void {
    if (this.plantForm.valid) {
      const plant: PlantDTO = this.plantForm.value;
      this.plantService.addPlant(plant).subscribe((plant) => {
        this.closeModal();
      }, (error) => {
        console.error('Error adding plant:', error);
      });
    }
  }
  update():void{
    const plant: PlantDTO = this.plantForm.value;
    this.plantService.updatePlant(plant).subscribe((plant) => {
      this.isUpdate = false;
      this.closeModal();
    }, (error) => {
      console.error('Error', error);
    });
  
  }
  closeModal() {
    this.isOpen = false;
  }
  openModal() {
    this.isOpen = true;
  }
  loadCountries(): void {
    this.geoService.getCountries().subscribe(data => {
      this.countries = data.data;
    });
  }
  openEdit(plant: PlantDTO) {
    this.plantForm.patchValue({
      id:plant.id,
      country: plant.country,
      name: plant.name
    });
    this.plant = plant;
    this.sensorList = plant.sensorSummaryDTOList;
    this.isUpdate = true;
    this.openModal();
  }
  openCreate() {
    this.isUpdate = false;
    this.plantForm.patchValue({
      id:'',
      country: '',
      name:''
    });
    this.openModal();
  }
  openSensorEditModal(plant:PlantDTO, sensor:SensorSummaryDTO){
    console.log(sensor)
    console.log(plant)
    this.sensorModal.openEdit(sensor, plant);
  }
}
