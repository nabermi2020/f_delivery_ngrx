import { CartComponent } from '../cart/cart/cart.component';
import { AuthGuard } from './../auth/auth-guard.service';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductGridComponent } from './product-grid/product-grid.component';
 

const dashboardRoutes: Routes = [
    { 
        path: '',
        component: ProductDashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { 
                path: "products",
                component: ProductGridComponent,
                children: [
                   { 
                        path: ':cat',
                        component: ProductGridComponent,
                        canActivate: [AuthGuard]
                   },
                ] 
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}
