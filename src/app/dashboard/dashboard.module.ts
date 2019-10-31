import { ProductsEffects } from './store/products.effects';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FiltersComponent } from './filters/filters.component';
import { FilterProductsPipe } from './filter-products.pipe';

@NgModule({
    declarations: [
       ProductDashboardComponent, 
       ProductGridComponent,
       ProductItemComponent,
       FiltersComponent,
       FilterProductsPipe
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        FormsModule,
        EffectsModule.forFeature([ProductsEffects])
    ],
    exports: []
})
export class DashboardModule {}
