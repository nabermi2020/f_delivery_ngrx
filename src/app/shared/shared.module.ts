import { SideBarComponent } from './../shared/side-bar/side-bar.component';
import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../shared/header/header.component';

import { NgModule } from '@angular/core';
import { ShortenPipe } from './shorten.pipe';
import { FormatPhonePipe } from './format-phone.pipe';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
    declarations: [
       HeaderComponent,
       SideBarComponent,
       ShortenPipe,
       FormatPhonePipe,
       FooterComponent,
       LoadingComponent 
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
        LoadingComponent
    ]

})
export class SharedModule {}
