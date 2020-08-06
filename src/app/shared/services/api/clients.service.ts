import { Injectable } from '@angular/core';
import {
  map
} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { Device } from "../../models";
import { TelemetrySummary } from "../../models/telemetrysummary.model";
import { TagGroup } from "../../models/taggroup.model";
import { ClientModel } from "../../models/client.model";

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
    return this.http.get<ClientModel[]>(`${this.baseUrl}`, httpOptions);
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

  getSummaryTelemetry(clientId: string, start: string, end: string, tags: string, interval: string) {
    return this.http.get<TelemetrySummary[]>(`${this.baseUrl}/${clientId}/telemetries/summary?` +
      `start=${start}&end=${end}&tags=${tags}&interval=${interval}`);
  }

  getTagList(clientId: string) {
    return this.http.get<TagGroup[]>(`${this.baseUrl}/${clientId}/tags/grouped`, httpOptions);
  }
}
