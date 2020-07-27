import { TelemetryData } from "./telemetry/data.model";
import { Deserializable } from "./deserializable.model";

export class TelemetrySummary implements Deserializable {
  tag: string;
  date: string;
  data: TelemetryData;

  deserialize(input: any) {
    Object.assign(this, input);
    this.data = new TelemetryData().deserialize(this.data);
    return this;
  }
}
