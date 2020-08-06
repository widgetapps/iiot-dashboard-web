export class ClientModel {
  _id: string;
  created: string;
  updated: string;
  companyName: string;
  apikey: {
    id: string;
  };
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  reseller: {
    isReseller: boolean;
    client: ClientModel[];
  }
}
