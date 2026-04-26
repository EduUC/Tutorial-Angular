import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../model/clientes';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from '../clientes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.scss',
})
export class ClientesListComponent implements OnInit {
  dataSource = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private clientesService: ClientesService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((clientes) => {
      this.dataSource.data = clientes;
    });
  }

  createCliente() {
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
}
