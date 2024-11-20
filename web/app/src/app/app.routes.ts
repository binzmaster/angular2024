import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { FoodtypeComponent } from './foodtype/foodtype.component';
import { FoodSizeComponent } from './food-size/food-size.component';
import { TasteComponent } from './taste/taste.component';
import { FoodComponent } from './food/food.component';
import { SaleComponent } from './sale/sale.component';
import { OrganizationComponent } from './organization/organization.component';
import { BillSaleComponent } from './bill-sale/bill-sale.component';

export const routes: Routes = [
    {
        path: '',
        component: SignInComponent,
    },
    {
        path:'foodType',
        component:FoodtypeComponent,
    },
    {
        path:'foodSize',
        component:FoodSizeComponent,

    },
    {
        path:'taste',
        component:TasteComponent,
    },
    {
        path:'food',
        component:FoodComponent,
    },
    {
        path:'sale',
        component:SaleComponent,
    },
    {
        path:'organization',
        component:OrganizationComponent,
    },
    {
        path:'bill-sale',
        component:BillSaleComponent,
    }
];
