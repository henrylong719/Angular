import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  @Output() fireSelectedRecipeFromList = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is simply a test",
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872"
    ),
    new Recipe(
      "A Test Recipe2",
      "This is simply a test2",
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872"
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onReceiveRecipeFromList(recipe: Recipe) {
    this.fireSelectedRecipeFromList.emit(recipe);
  }
}
