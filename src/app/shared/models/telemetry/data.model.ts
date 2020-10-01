import { DataSummary } from "./summary.model";
import { Deserializable } from "../deserializable.model";

export class TelemetryData implements Deserializable {
  unit: string;
  count: number;
  summary: DataSummary;
  values: number[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.summary = new DataSummary().deserialize(this.summary)
    return this;
  }
}
