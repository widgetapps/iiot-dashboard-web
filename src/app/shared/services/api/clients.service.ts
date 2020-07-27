import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import {Device} from "../../models";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseUrl = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) { }

  getClients() {

  }

  getClient(clientId: string) {

  }

  postClient() {

  }

  putClient() {

  }

  getDevices(clientId: string) {
    return this.http.get<Device[]>(`${this.baseUrl}/${clientId}/devices`, httpOptions);
  }
}
