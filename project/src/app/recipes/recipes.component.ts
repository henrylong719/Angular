import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { recipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor() {}

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // });
  }

  // onReceiveRecipe(recipe: Recipe) {
  //   this.selectedRecipe = recipe;
  // }
}
