import {Component, Input, OnChanges} from '@angular/core'
import { ISession } from '../shared/index'
import {AuthService} from '../../user/auth.service'
import {VoterService} from './voter.service'

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges{
    @Input()  sessions!: ISession[]
   
    @Input() filterBy!: string; //receiving this string from the event-details component
    //this will be responsible for filtering the sessions according to their properties
    
    @Input() sortBy!: string; //sorting the events based on votes/names

    @Input() eventId!: number
    //created a new property because we didnt want to make a subset of the original sessions. due to this we might lose entire set of sessions.
    visibleSessions: ISession[] = []

    constructor(private auth: AuthService, private voterService:VoterService){

    }


    ngOnChanges(){
        //this method will be called everytime when the input variables to this component get a new value
        //it can be called before any other data is set
        //since we are passing the sessions, we dont want to react and execute any code in the sessions-list 
        // in the ngonchanges if the sesssions havent been set yet.


        //will check if there are any sessions actually set 
        if(this.sessions){
            this.filterSessions(this.filterBy) //if true then filter the sessions accordingly

            //after the sessions are filtered we also want to sort them
            //so if we want to sort by name, then the sort function will call sortbynameascending
            // else it will be votes, and the sort function would call sortbyVotesDesc
            
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc)
        }
    }

    toggleVote(session:ISession){
        if(this.userHasVoted(session)) {
            this.voterService.deleteVoter(this.eventId,session, this.auth.currentUser.userName )
        } else {
            this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName)
        }

        if(this.sortBy === 'votes')
            this.visibleSessions.sort(sortByVotesDesc)
    }

    userHasVoted(session: ISession){
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName)

    }
    
   
    // //the function just compares the values and then informs the sorting method how those two values should be in a relationship to each other
    // sortByNameAsc(s1: ISession, s2: ISession) {
    //     //compare the two sessions
    //     if(s1.name > s2.name) return 1 //first session appears alphabetically before the second session
    //     else if(s1.name === s2.name) return 0 //both are equal
    //     else return -1 //second session's name is before the first session's name
    // }

    // sortByVotesDesc(s1: ISession, s2: ISession) {
    //      //compare the two length of the voters array of the two sessions
    //     return s2.voters.length - s1.voters.length 
    //     //if length will be equal then return 0
    //     //if length of second one will be greater then +ve number returned else -ve number
    // }

    filterSessions(filter: string){

        //if the value is set to all then we dont want the filtering to take place
        //all the sessions should be displayed here
        //else only display those ones where the value actually matches the level
        if(filter === 'all'){
            this.visibleSessions = this.sessions.slice(0) //we created here a clone of the sessions. since wanted an entire new list or a duplicate
        } else{
            //creating subset of sessions array
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter
            } )
        }
    }

}


//the below functions are put outside of the class because they are just sorting functions and stateless functions
//the functions dont actually need to be the methods of the class

//the function just compares the values and then informs the sorting method how those two values should be in a relationship to each other
function sortByNameAsc(s1: ISession, s2: ISession){
    //compare the two sessions
    if(s1.name > s2.name) return 1 //first session appears alphabetically before the second session
    else if(s1.name === s2.name) return 0 //both are equal
    else return -1 //second session's name is before the first session's name
}

function sortByVotesDesc(s1: ISession, s2: ISession){
    //compare the two length of the voters array of the two sessions
    return s2.voters.length - s1.voters.length 
    //if length will be equal then return 0
    //if length of second one will be greater then +ve number returned else -ve number
   
}



//FILTERING DATA:
//filterBy: string
//we have passed the value to this component but we need to take action on that value
//THUS, we need to change what sessions will be displayed when the filterBy changes its value accordingly


//OnChanges is the interface
//slice method creates a complete duplicate of the array with all the elements
//filter method creates a subset based on a condition

//.sort function isnt a mutating function, it sorts the array in place
//doesnt create a clone and leaves the original array unsorted

//NOTE:
 //if we want to use it insidde the component then access the below function like this.sortbynameasc
//if the function is present outside of the component, then access the function using its name only