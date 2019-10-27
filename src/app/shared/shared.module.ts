import { AppRoutingModule } from './../app-routing.module';
import { SideBarComponent } from './../shared/side-bar/side-bar.component';
import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../shared/header/header.component';

import { NgModule } from '@angular/core';
import { ShortenPipe } from './shorten.pipe';
import { FormatPhonePipe } from './format-phone.pipe';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { ErrorComponent } from './error/error.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';


@NgModule({
    declarations: [
       HeaderComponent,
       SideBarComponent,
       ShortenPipe,
       FormatPhonePipe,
       FooterComponent,
       LoadingComponent,
       ErrorComponent,
       ConfirmationPopupComponent    
    ],
    imports: [
        CommonModule,  
        DashboardRoutingModule
    ], 
    exports: [
        HeaderComponent,
        SideBarComponent,
        FormatPhonePipe,
        FooterComponent,
        LoadingComponent,
        ErrorComponent,
        ConfirmationPopupComponent
    ]

})
export class SharedModule {}
