import { AuthenticationComponent } from './authentication/authentication.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const authRoutes: Routes = [
    { 
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            { 
                path: 'signin',
                component: SignInComponent
            },
            { 
                path: 'signup',
                component: SignUpComponent 
            },
            { 
                path: '',
                redirectTo: '/authentication/signin',
                pathMatch: 'full'
            },
        ]
    },
    { 
        path: '',
        redirectTo: '/authentication/signin',
        pathMatch: 'full' 
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule { }
