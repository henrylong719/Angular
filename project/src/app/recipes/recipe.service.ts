import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Injectable()
export class recipeService {
  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 2)]
    ),
    new Recipe(
      'A Test Recipe2',
      'This is simply a test2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872',
      [new Ingredient('carrot', 2), new Ingredient('buns', 3)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
