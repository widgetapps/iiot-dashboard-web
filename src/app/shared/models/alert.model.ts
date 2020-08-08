export class AlertModel {
  _id: string;
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
