import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { ConfirmationPopupComponent } from '../shared/confirmation-popup/confirmation-popup.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        CartComponent,
        OrderConfirmationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule 
    ],
    exports: []
})
export class CartModule {}
