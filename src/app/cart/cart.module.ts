import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule 
    ],
    exports: []
})
export class CartModule {}
