import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/shoppingList.service';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);

    // this.ingredientAdded.emit(newIngredient);

    this.shoppingListService.addIngredient(newIngredient);
  }
}
