import { Component } from '@angular/core'
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router'
import { IEvent, ISession } from '../shared/index';

@Component({
    //selector: 'event-details',
    templateUrl: './event-details.component.html',
    styles:[`
        .container {padding-left:20px; padding-right:20px;}
        .event-image {height:100px;}    
        a {cursor:pointer}
    `]
})

export class EventDetailsComponent{
    //event is of the type IEvent
    event!: IEvent;
    addMode!: boolean;
    
    //added a filterBy property that will filter the sessions according to their property
    filterBy = 'all'; //added a default string which will be changed according to the respective levels

    sortBy = 'votes' //sorting property add to sort by name or by votes

    constructor(private eventService: EventService, private route:ActivatedRoute){

    }

    ngOnInit(){
        //this.event = this.eventService.getEvent(1) - only used to pass hardcoded id:1 thus cant load other pages. even if we pass id2 it will still load the same page.
        
        //this will give the parameters of the current route that was used to access this component.
        //here snapshot means whatever the parameter is, it creates a fixed copy and doesnt take in charge of the changes.
        //this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])

        //ROUTING TO THE SAME COMPONENT
        //subscribing to the route parameters so that we can navigate to a different page within the same component
        //this.route.params.forEach((params: Params) => {
        
        //Previously we were subscribing to the params object
        //the activated route paramter has a list of parameters. It also has a list of all the data that has been resolved
        this.route.data.forEach((data) => {

            //this.event= this.eventService.getEvent(+params['id'])

            //here we will be using the HTTP call and subscribe it to without which it wont work
            //the parameter of the subscribe method is the value that it is gonna receive when the 'getEvent' method will be called
            //this.eventService.getEvent(+params['id']).subscribe((event: IEvent) => {
                //inside the function we will handle the results of the getEvent call
                //this.event = this.route.snapshot.data['event']
                this.event = data['event'] //here data is being accessed as the property not of the snapshot but of the callback thats being passed into the forEach function
                ;
                //NOTE: when we subscribe or react to a route paramter change, make sure to reset the states (eg: addMode etc)
                //added this inside, because we want to do this thing when the result becomes successful
                this.addMode = false

            })

     
    }

    addSession(){
        this.addMode = true //toggling a flag on the component

    }

    saveNewSession(session:ISession){

        //get the maxid from the sessions array and increment it by 1 because we need to define an id for the sessions
        const nextId = Math.max.apply(null, this.event?.sessions.map(s => s.id));
        session.id = nextId + 1

        //adding the session to the event
        this.event?.sessions.push(session)
        //this.eventService.updateEvent(this.event) //calling the updateevent to save the event
        this.eventService.saveEvent(this.event).subscribe()
        this.addMode = false //once added make it false, so that all the sessions can be displayed again
    }

    cancelAddSession(){
        this.addMode = false
    }

}

//the selector is missing, because it is written when the component is used within the HTML page.
//But, this component isnt going to be used a child component from other page, it will be routed to directly so we wont need a selector.
//since the page wlll be routed directly, the ID of the event that we want to view will be in the URL.

//Call will be made to the event service to fetch the events for this page.
//ACTIVATED ROUTE is used to pull the parameters off the URL.
