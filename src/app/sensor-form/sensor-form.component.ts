import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorService } from '../services/sensor.service';
import { PlantDTO, SensorSummaryDTO, SensorType } from '../models';

@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styleUrl: './sensor-form.component.css'
})
export class SensorFormComponent {
  sensorForm: FormGroup;
  isOpen = false;
  isUpdate = false;
  sensorTypes : string[] = Object.values(SensorType);
  existingSensorTypes: string[] = [];
  numbers: number[] = [];

  constructor(private formBuilder: FormBuilder, private sensorService: SensorService){}
  ngOnInit(): void {
    this.sensorForm =  this.formBuilder.group({
      id:'',
      plant_id:'',
      type:  ['',[Validators.required]],
      totalSensors: [0,[Validators.required]],
      okReadings: [0,[Validators.required]],
      mediumAlerts: [0,[Validators.required]],
      redAlerts: [0,[Validators.required]],
      disabledSensors: [0,[Validators.required]],
    }, { validator: this.checkTotalSensors });
    this.sensorForm.valueChanges.subscribe(() => {
      this.sensorForm.updateValueAndValidity();
    });
  }
  onSubmit(): void {
    if (this.sensorForm.valid) {
      const sensor: SensorSummaryDTO = this.sensorForm.value;
      this.sensorService.createSensorSummary(sensor).subscribe((sensor) => {
        this.closeModal();
      }, (error) => {
        console.error('Error adding sensor:', error);
      });
    }
  }
  update():void{
    const sensor: SensorSummaryDTO = this.sensorForm.value;
    this.sensorService.updateSensorSummary(sensor).subscribe((sensor) => {
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

  openEdit(sensor: SensorSummaryDTO, plant:PlantDTO) {
    this.sensorForm.patchValue({
      id:sensor.id,
      plant_id:plant.id,
      type:sensor.type,
      totalSensors: sensor.totalSensors,
      okReadings: sensor.okReadings,
      mediumAlerts: sensor.mediumAlerts,
      redAlerts:sensor.redAlerts,
      disabledSensors: sensor.disabledSensors,
      
    });
    this.isUpdate = true;
    this.openModal();
  }
  openCreate(plant:PlantDTO) {
    this.isUpdate = false;
    this.sensorForm.patchValue({
      plant_id:plant.id,
      type:'',
      totalSensors: 0,
      okReadings: 0,
      mediumAlerts: 0,
      redAlerts: 0,
      disabledSensors: 0,
    });
    plant.sensorSummaryDTOList.forEach((sensor) => {
      this.existingSensorTypes.push(sensor.type);
    });
    this.sensorTypes = this.sensorTypes.filter((type) => !this.existingSensorTypes.includes(type));
    this.openModal();
  }
  private numbersCache: number[] = [];

  checkTotalSensors(group: FormGroup) {
    const total = group.get('totalSensors')?.value;
    const ok = group.get('okReadings')?.value;
    const medium = group.get('mediumAlerts')?.value;
    const red = group.get('redAlerts')?.value;
    const disabled = group.get('disabledSensors')?.value;

    const sum = ok + medium + red + disabled;

    if (sum > total || sum < total) {
      return { exceedTotal: true };
    }
    return null;
  }

}
