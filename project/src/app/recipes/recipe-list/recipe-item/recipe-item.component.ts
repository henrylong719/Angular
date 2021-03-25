import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { recipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  // @Output() fireSelectedRecipe = new EventEmitter<void>();

  constructor(private recipeService: recipeService) {}

  ngOnInit(): void {}

  onSelected() {
    // this.fireSelectedRecipe.emit();
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
