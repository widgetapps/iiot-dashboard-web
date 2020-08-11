export class AlertModel {
  _id: string;
  name: string;
  assets: string[];
  sensor: string;
  alertGroupCodes: string[];
  active: boolean;
  frequencyMinute: number;
  limits: {
    low: number;
    high: number;
  }
}
