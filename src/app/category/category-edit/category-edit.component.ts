import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../model/category';
import { CategoryService } from '../category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-edit',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
})
export class CategoryEdit implements OnInit {
  category: Category = new Category();

  constructor(
    public dialogRef: MatDialogRef<CategoryEdit>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category },
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.category = this.data.category ? Object.assign({}, this.data.category) : new Category();
  }

  onSave() {
    this.categoryService.saveCategory(this.category).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
