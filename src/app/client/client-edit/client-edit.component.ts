import { Component, OnInit, Inject } from '@angular/core';
import { Client } from '../model/client';
import { ClientService } from '../client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-edit',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss',
})
export class ClientEditComponent implements OnInit {
  client: Client = new Client();

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
    this.client = new Client();
  }

  onSave() {
    // Implementar lógica para salvar o client
  }

  onClose() {
    // Implementar lógica para fechar o diálogo
  }
}
