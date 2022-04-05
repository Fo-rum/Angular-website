//import {Injectable} from '@angular/core'

import {InjectionToken} from '@angular/core'

//declare let toastr:any
//the above toastr object which is a global object must be declared in the app module where it is going to be used.

export const TOASTR_TOKEN = new InjectionToken<Toastr>('toastr')
//the constructor of the Injection token takes in a type paramter 
//and that type is the type of the object that is given back for the service
//this token is used for to look up the instance of the ToastrService, this is the type that is given back
// here TOASTR_TOKEN is the object and 'toastr' is the string
//thus we have created an instance like this in the DEPENDENCY INJECTION

export interface Toastr {
    success(msg:string, title?:string) : void;
    info(msg:string, title?:string) : void;
    warning(msg:string, title?:string) : void;
    error(msg:string, title?:string) : void;
}

// @Injectable()

// export class ToastrService{
//     success(message:string, title?:string){
//         toastr.success(message,title)
//     }
//     info(message:string, title?:string){
//         toastr.info(message,title)
//     }
//     warning(message:string, title?:string){
//         toastr.warning(message,title)
//     }
//     error(message:string, title?:string){
//         toastr.error(message,title)
//     }

// }


//create a key or a token that can be used to register with Angular's dependency injector
// So that whenever we want an instance of the token class, the key or the token can be used as a way to look it up and find the required instance

//INJECITON TOKEN:
//Angular provides a mechanism for us to create a key or a token that we can use in the dependency injector without creating a class
//the job of injection token is to simply create a token used for the dependency injection registry in order to find the instance of the service we want
