import {Component} from '@angular/core'
import {AuthService} from './auth.service'
import {Router} from '@angular/router'




@Component({
    templateUrl: './login.component.html',
    styles:[`
        em{float:right; color:#E05C65; padding-left:10px;}
    `]
})

export class LoginComponent{

    //while wiring the properties to the ngModel, they must always be listed in the component otherwise it would raise an error
    username: any
    password: any
    mouseoverLogin: any
    loginInvalid = false

    constructor(private authService: AuthService, private router:Router){

    }
    
    login(formValues: any){
        //console.log(formValues)
        this.authService.loginUser(formValues.userName, formValues.password)
            .subscribe(resp => {
                if(!resp) {
                    this.loginInvalid = true
                    
                } else{
                    //after loggin in, take to the events page
                    this.router.navigate(['events'])
                }
            })

        
    }

    cancel(){

        //clicking on the cancel button also would take to the events page
        this.router.navigate(['events'])

    }
}