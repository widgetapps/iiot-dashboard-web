import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import {AlertGroupModel, Device} from "../../models";
import { TelemetrySummary } from "../../models";
import { TagGroup } from "../../models";
import { ClientModel } from "../../models";
import { AlertModel } from "../../models";

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

  getAlerts(clientId: string) {
    return this.http.get<AlertModel[]>(`${this.baseUrl}/${clientId}/alerts`, httpOptions);
  }

  postAlert(clientId: string, payload: AlertModel) {
    return this.http.post<AlertModel>(`${this.baseUrl}/${clientId}/alerts`, payload, httpOptions);
  }

  getAlert(clientId: string, alertId: string) {
    return this.http.get<AlertModel>(`${this.baseUrl}/${clientId}/alerts/${alertId}`, httpOptions);
  }

  putAlert(clientId: string, alertId: string, payload: AlertModel) {
    return this.http.put<AlertModel>(`${this.baseUrl}/${clientId}/alerts/${alertId}`, payload, httpOptions);
  }

  deleteAlert(clientId: string, alertId: string) {
    return this.http.delete<string>(`${this.baseUrl}/${clientId}/alerts/${alertId}`, httpOptions);
  }

  getAlertGroups(clientId: string) {
    return this.http.get<AlertModel[]>(`${this.baseUrl}/${clientId}/alertgrpoups`, httpOptions);
  }

  postAlertGroup(clientId: string, payload: AlertGroupModel) {
    return this.http.post<AlertGroupModel>(`${this.baseUrl}/${clientId}/alertgrpoups`, payload, httpOptions);
  }

  getAlertGroup(clientId: string, code: string) {
    return this.http.get<AlertModel[]>(`${this.baseUrl}/${clientId}/alertgrpoups/${code}`, httpOptions);
  }

  putAlertGroup(clientId: string, code: string, payload: AlertGroupModel) {
    return this.http.put<AlertModel[]>(`${this.baseUrl}/${clientId}/alertgrpoups/${code}`, payload, httpOptions);
  }

  deleteAlertGroup(clientId: string, code: string) {
    return this.http.delete(`${this.baseUrl}/${clientId}/alertgrpoups/${code}`, httpOptions);
  }
}
