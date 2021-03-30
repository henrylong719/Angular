import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { recipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: recipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://ng-recipe-book-27711-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    // take(1): only take once then unsubscribe()
    // exhaustMap (makes the call and ignores any new request until the previous call comes back)

    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-27711-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredient: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  // fetchRecipes() {
  //   this.http
  //     .get<Recipe[]>(
  //       'https://ng-recipe-book-27711-default-rtdb.firebaseio.com/recipes.json'
  //     )
  //     .pipe(
  //       map((recipes) => {
  //         return recipes.map((recipe) => {
  //           return {
  //             ...recipe,
  //             ingredient: recipe.ingredients ? recipe.ingredients : [],
  //           };
  //         });
  //       })
  //     )
  //     .subscribe((recipes) => {
  //       this.recipeService.setRecipes(recipes);
  //     });
  // }
}

// take(1): only take once then unsubscribe()
// exhaustMap (makes the call and ignores any new request until the previous call comes back)

// return this.authService.user.pipe(
//   take(1),
//   exhaustMap((user) => {
//     return this.http.get<Recipe[]>(
//       'https://ng-recipe-book-27711-default-rtdb.firebaseio.com/recipes.json',
//       {
//         params: new HttpParams().set('auth', user.token),
//       }
//     );
//   }),
//   map((recipes) => {
//     return recipes.map((recipe) => {
//       return {
//         ...recipe,
//         ingredient: recipe.ingredients ? recipe.ingredients : [],
//       };
//     });
//   }),
//   tap((recipes) => {
//     this.recipeService.setRecipes(recipes);
//   })
// );
