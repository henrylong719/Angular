import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;

  id: number;
  recipe: Recipe;

  constructor(
    private recipeService: recipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // +: change string to number
      this.id = +params.id;
      this.recipe = this.recipeService.getRecipe(this.id);
    });
    // this.id = this.route.snapshot.params['id'];
  }

  onAddToShoppingList() {
    // this.recipe.ingredients.map((Ingredient) => {
    //   this.shoppingListService.addIngredient(Ingredient);
    // });
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
