# Angular



## Authentication

<img src="/Users/henrylong/Angular/Angular/images/Authentication.png" alt="Authentication" style="zoom:50%;" />

In the recipe book project

1. create a new component called `auth` and add `auth.component.html` and `auth.component.ts ` and bring it to the `app.module.ts`
2. add `AuthComponent` to the route in the `app-routing.module.ts`

3. create `auth.service.ts` to mange signin user etc.



**Add loading spinner**

1. https://loading.io/css/
2. Create `loading-spinner component` under `shared`
3. import  `loading-spinner component`  into `app.module.ts`
4. use  `loading-spinner component`  in the auth component



**Maintain user login information**

1. create `user.model.ts` under `auth`
2. import the user model to `auth.service.ts` and save login or registered users
3. use the `user subject` in the `header component`

since fetching or saving request needs to have user token

4. modify `user = new BehaviorSubject<User>(null);` in the `auth.service.ts`

5. modify methods in `data-storage.service.ts`

6. create `auth-interceptor.service.ts` in the `auth` folder

7. import `auth-interceptor.service.ts` in the `app.module.ts`

   
   
8. create `  logout` in the `auth.service.ts` and import it into `header component`

   

**Use local storage to store user information** 

9. modify `handleAuthentication` in the `auth.service.ts`
10. add `autoLogin` in the `auth.service.ts`
11. Use the `autoLogin` in the `app.component.ts`



**autoLog out if the token expires**

12. add `autoLogout` in the `auth.service.ts` 
13. bring `autoLogout` to `handleAuthentication` and `autoLogin`



**Add Auth Guard**

14. create `auth.guard.ts` under `auth`
15. import `AuthGuard` in the `app-routing.module.ts`



## Dynamic Components

<img src="/Users/henrylong/Angular/Angular/images/dynamic-components.png" alt="dynamic-components" style="zoom:50%;" />



1. create `alert` component under `shared` folder
2. import `AlertComponet` to `app.module.ts`
3. use alert in the `auth.component.html`



**Programmatic create dynamic components**

.....



### Angular Modules & Optimizing Angular Apps



<img src="/Users/henrylong/Angular/Angular/images/modules.png" alt="modules" style="zoom:50%;" />





### Splitting Modules

Example: Recipe module 

1. Create `recipes.module.ts` under `recipes`  folder

2. move all recipes relared components to the `recipes.module.ts` and import ` RecipesModule` in the `app.module.ts`

3. Import `RecipesRoutingModule,` in the `recipes.module.ts`

   


**Share Modules**

1. create `shared.module.ts`
2. import `shared.module.ts` in the `recipes.module.ts` `shopping-list.module.ts` (they use `CommonModule,` in the `share module.ts`) and `app.module.ts`



**Core Module**

core module is used to replaced the `providers` in the `app.module.ts`



1. create `core.module.ts`
2. import `core.module.ts` in the `app.module.ts`



**Auth Module**





### Lazy Loading



<img src="/Users/henrylong/Angular/Angular/images/lazy-loading.png" alt="lazy-loading" style="zoom:50%;" />



**Recipes routing** example

1. in the `recipes-routing.module.ts` , change the path to ''

```typescript

// path: 'recipes',
    path:'',
      
```



2. in the `app-routing.module.ts`, modify the appRoutes

```typescript

const appRoutes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // for lazy loading
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
];
    
```



3. in the `tsconfig.app.json`, set:

```typescript

    "module": "esnext",
      
```





### preloading lazy-loaded code



```typescript

// app-routing.module.ts

@NgModule({
  imports: [
    // preloading lazy-loaded code
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
```



 



### Ahead of Time Compilation

<img src="/Users/henrylong/Angular/Angular/images/Compilation.png" alt="Compilation" style="zoom:50%;" />

```bash
$ ng build --prod
```













