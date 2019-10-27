import { ErrorService } from './shared/services/error.service';
import { LoadingService } from './shared/services/loading.service';
import { OrdersService } from './shared/services/orders.service';
import { EditModalService } from './shared/services/edit-modal.service';
import { ProductService } from './shared/services/products.service';
import { AuthService } from './auth/services/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCart } from './shared/services/product-cart.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    ProductService,
    ProductCart,
    EditModalService,
    OrdersService,
    LoadingService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
