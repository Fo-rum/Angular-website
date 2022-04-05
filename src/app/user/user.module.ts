import {NgModule} from '@angular/core'
import {CommonModule } from '@angular/common'
import {RouterModule} from '@angular/router'
import {userRoutes} from './user.routes'
import {ProfileComponent} from './profile.component'
import { LoginComponent } from './logic.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes)
    ],
    declarations:[
        ProfileComponent,
        LoginComponent
    ],
    providers:[

    ]
})

export class UserModule{}

//the key difference betweeen the app-module and the user module is that the app-module consists of browser module whereas a feature module or a lazy loadable module consists of a Common Module
//in the router module we called routermodule.forchild whereas in the app-module we called routermodule.forroot

//To use the Forms Directive, we have imported the Forms Module.
//Since the form is in our user module, we'll need to import it here.
//The Forms module gives us an access to some of the forms features.