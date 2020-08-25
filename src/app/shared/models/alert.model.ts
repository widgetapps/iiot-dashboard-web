export class AlertModel {
  _id: string;
  name: string;
  assets: any[];
  sensorCode: string;
  alertGroupCodes: any[];
  active: boolean;
  frequencyMinutes: number;
  limits: {
    low: number;
    high: number;
  }
}
