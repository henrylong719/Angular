# Angular Project



<img src="/Users/henrylong/Library/Application Support/typora-user-images/Screen Shot 2021-03-18 at 9.23.59 am.png" alt="Screen Shot 2021-03-18 at 9.23.59 am" style="zoom:60%;" />

### The Basics



1. Structure 



<img src="/Users/henrylong/Library/Application Support/typora-user-images/Screen Shot 2021-03-18 at 10.05.23 am.png" alt="Screen Shot 2021-03-18 at 10.05.23 am" style="zoom:45%;" />



2. add navigation

3. create recipe model in `/recipes/recipe.model.ts`

4. loop recipes in the `recipe-list.component.html`

5. add element in the `recipe-detail.component.html`

6. create ingredient model in the `shared/ingredient.model.ts`

7. import ingredient in the `shopping-list.component.ts` and render it in the `shopping-list.component.html`

   

### Component & Databinding

1. allow navigation to switch arount `Recipes` and `shopping list`
   1. add click event in the `header.component.html`
   2. add `onSelect` in the `header.component.ts` and emit selected option to `app` component
   3. in the `app` component, implement the switch function 

2. passing recipe data from `recipe-list-component` to `recipe-item-component`
3. passing recipe data from `recipe-item-component` to `recipe-list-component` to `recipe-component` and then passing it to `recipe-details-component`
4. use `local reference ` and `view child`  to get data from `shopping-edit.component.html`  and pass it to `shopping-list component`



### Driectives

1. Create `dropdown.directive.ts` under `shared`

   

```typescript

import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen = false;
  @HostListener("click")
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}

```



**dropdown can also be closed by a click anywhere outside (placing the listener not on the dropdown, but on the document**



```typescript

import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen = false;

  @HostListener(" document:click", ["$event"])
  toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  constructor(private elRef: ElementRef) {}
}

```



2. bring `appDropdown` to `recipe-detail.component.html` and `header.component.html`



### Services and Dependency Injection



**deal with recipes**



1. create `recipe.service.ts` under `recipes`
2. bring `recipeService` to `recipes.component.ts` as a provider 
3. update `recipes` in the `recipe-list.component.ts`ßß



use of `EventEmitter` in the services

4. add `recipeSelected = new EventEmitter<Recipe>();` to `recipe.service.ts`

5. in the `recipe-item.component.ts` , emit selected recipe directly

   

```typescript

onSelected() {
    // this.fireSelectedRecipe.emit();
    this.recipeService.recipeSelected.emit(this.recipe);
  }

```



5. in the `recipes.component.ts`, get the selected recipe directly

```typescript

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
  
```





**deal with Ingredient**

1. Create `shoppingList.service.ts`
2. Update `shopping-list.component.ts`
3. update `shopping-edit.component.ts`



**add recipe ingredient in the `recipe-detail.component` to `shopping list`**

1. Modify `recipe-detail.component.ts` (add `  onAddToShoppingList`)
2. add `  addIngredientsToShoppingList` in the `recipe.service.ts`
3. add `  addIngredients` in the `shoppingList.service.ts`



### Routing

<img src="/Users/henrylong/Library/Application Support/typora-user-images/Screen Shot 2021-03-26 at 10.06.23 am.png" alt="Screen Shot 2021-03-26 at 10.06.23 am" style="zoom:50%;" />



1. create `app-routing.module.ts` and bring it to the `app.module.ts`
2. modify `app.component.html` (add `router-outlet`)
3. deactive all the links

**Add child route**

4. Modify `app-routing.module.ts`
5. modify `recipes.component.html`
6. modify `recipe-detail.component.ts`  and add `getRecipe` to `recipe.service.ts`
7. get the index of recipe-item by modifying `recipe-list.component.html` and `recipe-item.component.ts` as well as `recipe-item.component.html`
8. add `recipe-edit component` and bring it to the `app-routing.module.ts`
9. modify `recipe-edit component`





