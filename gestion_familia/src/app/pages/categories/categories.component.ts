import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ConceptListComponent } from "../../components/concept-list/concept-list.component";
import { CategoryListComponent } from "../../components/category-list/category-list.component";
import { SubcategoryListComponent } from "../../components/subcategory-list/subcategory-list.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NavbarComponent, ConceptListComponent, CategoryListComponent, SubcategoryListComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

}
