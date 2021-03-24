import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";

import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild("nameInput", { static: true }) nameInputRef: ElementRef;
  @ViewChild("amountInput", { static: true }) amountInputRef: ElementRef;

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);

    this.ingredientAdded.emit(newIngredient);
  }
}
