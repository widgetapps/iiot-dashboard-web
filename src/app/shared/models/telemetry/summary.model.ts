import { Deserializable } from "../deserializable.model";

export class DataSummary implements Deserializable {
  first: number;
  last: number;
  min: number;
  max: number;
  median: number;
  mean: number;
  sum: number

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
