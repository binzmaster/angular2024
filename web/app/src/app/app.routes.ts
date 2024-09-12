import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { FoodtypeComponent } from './foodtype/foodtype.component';

export const routes: Routes = [
    {
        path: '',
        component: SignInComponent,
    },
    {
        path:'foodType',
        component:FoodtypeComponent,
    },
    
];
