import { AuthEffects } from './store/auth.effects';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication/authentication.component';
import { authReducers } from './store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        AuthenticationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({auth: authReducers}),
        EffectsModule.forRoot([AuthEffects])
    ],
    exports: [
           
    ]
})


export class AuthModule {}
