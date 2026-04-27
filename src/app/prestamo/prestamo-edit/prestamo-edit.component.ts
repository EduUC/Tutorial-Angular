import { Component, Inject, OnInit } from '@angular/core';
import { Prestamo } from '../model/Prestamo';
import { ClientService } from '../../client/client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrestamoService } from '../prestamo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameService } from '../../game/game.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-prestamo-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    DatePipe,
  ],
  templateUrl: './prestamo-edit.component.html',
  styleUrl: './prestamo-edit.component.scss',
})
export class PrestamoEditComponent implements OnInit {
  prestamo!: Prestamo;
  games: any[] = [];
  clients: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<PrestamoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prestamoService: PrestamoService,
    private clientService: ClientService,
    private gameService: GameService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.prestamo = this.data.prestamo ? Object.assign({}, this.data.prestamo) : new Prestamo();

    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  compareObjects(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onSave() {
    const prestamoToSave = Object.assign({}, this.prestamo);

    if (this.prestamo.startDate) {
      prestamoToSave.startDate = this.datePipe.transform(
        this.prestamo.startDate,
        'yyyy-MM-dd',
      ) as any;
    }
    if (this.prestamo.endDate) {
      prestamoToSave.endDate = this.datePipe.transform(this.prestamo.endDate, 'yyyy-MM-dd') as any;
    }

    this.prestamoService.savePrestamo(prestamoToSave).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        alert('Error al guardar: ' + error.error.message);
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
