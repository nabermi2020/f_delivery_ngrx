import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from '../shared/shared.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderItemComponent } from './order-item/order-item.component';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileDetailComponent,
        EditProfileComponent,
        OrderHistoryComponent,
        OrderItemComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        DashboardRoutingModule
    ],
    exports: [

    ]
})
export class ProfileModule {}
