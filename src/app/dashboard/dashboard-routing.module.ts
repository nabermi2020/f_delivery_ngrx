import { PdpComponent } from './pdp/pdp.component';
import { OrderConfirmationComponent } from './../cart/order-confirmation/order-confirmation.component';
import { CartComponent } from '../cart/cart/cart.component';
import { ProfileDetailComponent } from './../userprofile/profile-detail/profile-detail.component';
import { AuthGuard } from './../auth/auth-guard.service';
import { ProfileComponent } from './../userprofile/profile/profile.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { OrderHistoryComponent } from '../userprofile/order-history/order-history.component';
import { ErrorComponent } from '../shared/error/error.component';

const dashboardRoutes: Routes = [
    { 
        path: '',
        component: ProductDashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { 
                path: 'profile',
                component: ProfileComponent,
                children: [
                    { 
                        path: 'user-info',
                        component: ProfileDetailComponent 
                    },
                    { 
                        path: 'order-history',
                        component: OrderHistoryComponent 
                    }, 
                ]
            },
        
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
            },
        
            { 
                path: 'cart',
                component: CartComponent
            },

            { 
                path: 'product-details',
                component: PdpComponent,
                children: [
                    { 
                      path: ':id',
                      component: PdpComponent 
                    }
                ] 
            },
            { 
                path: 'order-confirmation',
                component: OrderConfirmationComponent
            },
            {
                path: 'error',
                component: ErrorComponent,
                children: [
                    { 
                      path: ':id',
                      component: ErrorComponent 
                    }
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
