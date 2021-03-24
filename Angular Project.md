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





