import { Component, OnInit, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service'
import { AuthService } from './auth.service'

@Component({
//   template: `
//     <h1>Edit Your Profile</h1>
//     <hr>
//     <div class="col-md-6">
//       <h3>[Edit profile form will go here]</h3>
//       <br />
//       <br />
//       <button type="submit" class="btn btn-primary">Save</button>
//       <button type="button" class="btn btn-default">Cancel</button>
//     </div>
//   `,
templateUrl:'./profile.component.html',
styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder {color:#999;}
    .error ::-moz-placeholder {color:#999;}
    .error :-moz-placeholder {color:#999;}
    .error :ms-input-placeholder{color:#999;}
`]
})
export class ProfileComponent implements OnInit {
    profileForm!: FormGroup 
    private firstName!: FormControl
    private lastName!: FormControl
   
       
    constructor(private authService: AuthService, 
        private router:Router,
        //this tells angular that for the toastr variable that we are creating that will be the private member of this class
        //get the value by using the TOASTR_TOKEN to look up the service in the dependency injection registry
        @Inject(TOASTR_TOKEN) private toastr: Toastr){

    }
    ngOnInit(){
        //creating a form control for each
        //in the FormControl as the parameter we have passed the value that we want prepopulated with

        //we have added the required validators on both the form controls
        //let firstName = new FormControl(this.authService.currentUser.firstName,Validators.required)

        //below is the representation of multiple validators. array of validators passed.
        //Passed the validators where we require the first name to start with a letter. Pass the pattern that you want to validate against.
        this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
        this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)
        
        //adding the controls to the form
        //property: values (the values are set to these FormControls that we just created)
        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        })
    }

    //updating the values
    saveProfile(formValues: { firstName: string; lastName: string }){

        //validator added- wont save the form if it isnt valid
        if(this.profileForm.valid){
            this.authService.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe(()=> {
                this.toastr.success('Profile Saved') //displaying the toastr message only when the user has been updated on the server
            })
            //this.router.navigate(['events'])
        }
    }

    //logging out the user
    //once the user logs out, it should be redirected to the login page
    logout(){
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/user/login'])
        })
    }


    //LOGIC REVERSED. Will add an error if its not valid

    validateFirstName(){
        //profileForm.controls.firstName.invalid && profileForm.controls.firstName.touched
        return this.firstName.valid || this.firstName.untouched
    }

    validateLastName(){
        return this.lastName.valid || this.lastName.untouched
    }


    cancel(){
        this.router.navigate(['events'])
    }
}

//benefits of using reactive forms- can use validation in our component where its unit testable.
//Validators are passed as second component of the form control.

//For multiple validators we just pass in an array of Validators to the formcontrol.

//Inject is a decorator just like Component that allows us to use a separate token besides the type of construction parameter