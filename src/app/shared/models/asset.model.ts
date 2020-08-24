export class AssetModel {
  _id: string;
  created: number;
  updated: number;
  tagCode: string;
  name: string;
  description: string;
  settings: [];
  location: {
    description: string;
    geolocation: [number];
    address: {
      street: string;
      street2: string;
      city: string;
      province: string;
      postalCode: string;
      country: string;
    }
  }
}
