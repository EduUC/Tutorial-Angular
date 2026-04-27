import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pageable } from '../core/model/page/Pageable';
import { PrestamoPage } from './model/PrestamoPage';
import { Prestamo } from './model/Prestamo';
import id from '@angular/common/locales/extra/id';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/prestamo';

  getPrestamos(
    pageable: Pageable,
    title?: string,
    clientName?: string,
    searchDate?: Date,
  ): Observable<PrestamoPage> {
    return this.http.post<PrestamoPage>(this.baseUrl, {
      pageable,
      title,
      clientName,
      searchDate,
    });
  }

  savePrestamo(prestamo: Prestamo): Observable<Prestamo> {
    const { id } = prestamo;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Prestamo>(url, prestamo);
  }

  deletePrestamo(idPrestamo: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idPrestamo}`);
  }

  getAllPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.baseUrl);
  }
}
