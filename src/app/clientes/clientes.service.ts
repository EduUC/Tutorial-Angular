import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from './model/clientes';
import { CLIENTES_DATA } from './model/mock-clientes';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor() {}

  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES_DATA);
  }

  saveCliente(cliente: Cliente): Observable<Cliente | null> {
    return of(null);
  }

  deleteCliente(id: number): Observable<void | null> {
    return of(null);
  }
}
