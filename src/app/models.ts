export interface SensorSummaryDTO {
    id: number;
    plant_id: number;
    type: SensorType;
    totalSensors: number;
    okReadings: number;
    mediumAlerts: number;
    redAlerts: number;
    disabledSensors: number;
  }
  
  export enum SensorType {
    TEMPERATURE = 'TEMPERATURE',
    PRESSURE = 'PRESSURE',
    WIND = 'WIND',
    LEVELS = 'LEVELS',
    ENERGY = 'ENERGY',
    TENSION = 'TENSION',
    CARBON_MONOXIDE = 'CARBON_MONOXIDE',
    OTHER_GASES = 'OTHER_GASES'
  }
  export interface PlantDTO {
    id: number;
    name: string;
    country: string;
    sensorSummaryDTOList: SensorSummaryDTO[];
  }