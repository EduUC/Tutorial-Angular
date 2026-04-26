import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './model/client';
import { CLIENTS_DATA } from './model/mock-client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor() {}

  getClients(): Observable<Client[]> {
    return of(CLIENTS_DATA);
  }

  saveCliente(cliente: Client): Observable<Client | null> {
    return of(null);
  }

  deleteCliente(id: number): Observable<void | null> {
    return of(null);
  }
}
