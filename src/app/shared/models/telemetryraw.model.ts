export class TelemetryRawModel {
  _id: string;
  timestamp: number;
  tag: {
    full: string;
    clientTagCode: string;
    locationTagCode: string;
    assetTagCode: string;
    sensorTagCode: string;
  }
  data: {
    unit: string;
    values: {
      min: number;
      max: number;
      average: number;
      point: number;
      samples: number;
    }
  }
}
