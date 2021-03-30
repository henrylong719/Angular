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

