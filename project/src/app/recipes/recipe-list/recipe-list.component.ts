import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() fireSelectedRecipeFromList = new EventEmitter<Recipe>();

  recipes: Recipe[] = [];

  // recipes: Recipe[] = [
  //   new Recipe(
  //     "A Test Recipe",
  //     "This is simply a test",
  //     "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872"
  //   ),
  //   new Recipe(
  //     "A Test Recipe2",
  //     "This is simply a test2",
  //     "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872"
  //   ),
  // ];

  subscription: Subscription;

  constructor(
    private recipeService: recipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
    //   this.recipes = recipes;
    // });

    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );

    this.recipes = this.recipeService.getRecipes();
  }

  // onReceiveRecipeFromList(recipe: Recipe) {
  //   this.fireSelectedRecipeFromList.emit(recipe);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
