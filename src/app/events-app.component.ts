import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'events-app',
  template:`
    <nav-bar></nav-bar>
    <router-outlet></router-outlet>
  `
})
export class EventsAppComponent {
    //title = 'app';
    constructor(private auth: AuthService){

    }

    //Persisting authentication status across page refreshes
    //previously if the user was logged in and refreshes then it is asked again to login but in the server its logged in
    
    ngOnIt(){
      this.auth.checkAuthenticationStatus().subscribe()
    }
}


//This component has two child components: nav-bar component and the events-list component.
//Therefore, this events-app is the top-level component and it gets loaded during the app's bootstrap process.
//Thus, this page loads and is displayed when we first navigate to our app. it then loads its child components.
// @Component({
//   selector: 'events-app',
//   template:`
//     <nav-bar></nav-bar>
//     <events-list></events-list>
//   `
// })

//Inform the user that when it requests a particular component, displays its corresponding component here.
