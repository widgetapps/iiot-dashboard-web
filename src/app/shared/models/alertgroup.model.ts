export class AlertGroupModel {
  code: string;
  name: string;
  contacts: [{
    name: string;
    sms: {
      send: boolean;
      number: string
    },
    email: {
      send: boolean;
      address: string;
    }
    user?: {
      send: boolean;
      id: string;
    }
  }]
}
