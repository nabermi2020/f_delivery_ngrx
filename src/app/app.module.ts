import { AuthHttpClientService } from './auth/services/auth-http-client.service';
import { StoreModule } from '@ngrx/store';
import { ProductCart } from './shared/services/product-cart.service';
import { ErrorService } from './shared/services/error.service';
import { LoadingService } from './shared/services/loading.service';
import { EditModalService } from './shared/services/edit-modal.service';
import { ProductService } from './shared/services/products.service';
import { AuthService } from './auth/services/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { reducers } from './store/app.reducers';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    AuthGuard,
    AuthService,
    ProductService,
    EditModalService,
    ProductCart,
    LoadingService,
    ErrorService,
    AuthHttpClientService   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
