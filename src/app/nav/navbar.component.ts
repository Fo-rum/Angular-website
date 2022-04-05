
import {Component} from '@angular/core'
import { EventService } from '../events/index';
import { ISession } from '../events/shared/event.model';
import { AuthService } from '../user/auth.service';

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles: [`
    .nav.navbar-nav {font-size:15px;}
    #searchForm {margin-right: 100px;}
    @media (max-width:1200 px) {#searchForm {display:none}}
    li > a.active {color: #F97924;}
`]
   
})

export class NavBarComponent {
    searchTerm = ""
    foundSessions!: ISession[];
    
    constructor(public auth:AuthService, private eventService: EventService){}


    //the search is going to return us a list of found sessions
    //here returning an observable
    searchSessions(searchTerm: any){
        this.eventService.searchSessions(searchTerm).subscribe
        (   (sessions: ISession[]) => {
            this.foundSessions = sessions  //returning the sesssions the match the term and declaring foundsessions to it
            //console.log(this.foundSessions)
        })

    }
}