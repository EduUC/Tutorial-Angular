import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEdit } from '../category-edit/category-edit.component';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryList implements OnInit {
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.dataSource.data = categories;
    });
  }

  createCategory() {
    const dialogRef = this.dialog.open(CategoryEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryEdit, {
      data: { category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: {
        title: 'Eliminar categoría',
        description:
          'Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminar la categoría?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(category.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }
}
