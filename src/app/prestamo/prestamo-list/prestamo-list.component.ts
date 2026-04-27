import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../model/Prestamo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PrestamoService } from '../prestamo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/page/Pageable';
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './prestamo-list.component.html',
  styleUrl: './prestamo-list.component.scss',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, DatePipe],
})
export class PrestamoListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  filterTitle!: string;
  filterClient!: string;
  prestamos!: Prestamo[];
  filterDate!: Date;

  dataSource = new MatTableDataSource<Prestamo>();
  displayedColumns: string[] = [
    'id',
    'game_name',
    'client_name',
    'start_date',
    'end_date',
    'action',
  ];

  constructor(
    private prestamoService: PrestamoService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  onCleanFilter(): void {
    this.filterTitle = null!;
    this.filterClient = null!;
    this.filterDate = null!;
    this.onSearch();
  }

  onSearch(): void {
    const title = this.filterTitle;
    const clientName = this.filterClient != null ? this.filterClient : null!;

    const searchDate: any = this.filterDate
      ? this.datePipe.transform(this.filterDate, 'yyyy-MM-dd')
      : null;

    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    this.prestamoService.getPrestamos(pageable, title, clientName, searchDate).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.prestamoService.getPrestamos(pageable, null!, null!, this.filterDate).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  createPrestamo() {
    const dialogRef = this.dialog.open(PrestamoEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editPrestamo(prestamo: Prestamo) {
    const dialogRef = this.dialog.open(PrestamoEditComponent, {
      data: { prestamo: prestamo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deletePrestamo(prestamo: Prestamo) {
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: {
        title: 'Eliminar préstamo',
        description:
          'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.prestamoService.deletePrestamo(prestamo.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }
}
