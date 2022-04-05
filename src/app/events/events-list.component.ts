//this page will display all the events


//importing the component decorator
import {Component, OnInit} from '@angular/core'
//import { ToastrService } from '../common/toastr.service';
import { EventService } from './shared/event.service';
import {ActivatedRoute} from '@angular/router'
import { IEvent } from './shared/index';

declare let toastr: { success: (arg0: any) => void; }

@Component({
    // selector: 'events-list',
    template:
    `
        <div>
            <h1> Upcoming Angular Events</h1>
            <hr/>
            <div class = "row">
                <div *ngFor="let event of events" class = "col-md-5">
                    <event-thumbnail  [event]="event"></event-thumbnail>
                </div>
            </div>
        </div>
    `
})

//this class will contain all the business logic for this component
export class EventsListComponent implements OnInit{

    //creation of an event object
    // event1={
    //     id:1,
    //     name:'Angular connect',
    //     date: '9/6/2036',
    //     time: '10:00 am',
    //     price: 599.99,
    //     imageUrl: '/assets/images/angularconnect-shield.png',
    //     location:{
    //         address: '1057 DT',
    //         city: 'London',
    //         country: 'England'
    //     }
    // }

    // handleEventClicked(data: any){
    //     console.log('received:', data)
    // }

    // events = [
    //     {
    //       id: 1,
    //       name: 'Angular Connect',
    //       date: '9/26/2036',
    //       time: '10:00 am',
    //       price: 599.99,
    //       imageUrl: '/assets/images/angularconnect-shield.png',
    //       location: {
    //         address: '1057 DT',
    //         city: 'London',
    //         country: 'England'
    //       },
    //       sessions: [
    //         {
    //           id: 1,
    //           name: "Using Angular 4 Pipes",
    //           presenter: "Peter Bacon Darwin",
    //           duration: 1,
    //           level: "Intermediate",
    //           abstract: `Learn all about the new pipes in Angular 4, both 
    //           how to write them, and how to get the new AI CLI to write 
    //           them for you. Given by the famous PBD, president of Angular 
    //           University (formerly Oxford University)`,
    //           voters: ['bradgreen', 'igorminar', 'martinfowler']
    //         },
    //         {
    //           id: 2,
    //           name: "Getting the most out of your dev team",
    //           presenter: "Jeff Cross",
    //           duration: 1,
    //           level: "Intermediate",
    //           abstract: `We all know that our dev teams work hard, but with 
    //           the right management they can be even more productive, without 
    //           overworking them. In this session I'll show you how to get the 
    //           best results from the talent you already have on staff.`,
    //           voters: ['johnpapa', 'bradgreen', 'igorminar', 'martinfowler']
    //         },
    //         {
    //           id: 3,
    //           name: "Angular 4 Performance Metrics",
    //           presenter: "Rob Wormald",
    //           duration: 2,
    //           level: "Advanced",
    //           abstract: `Angular 4 Performance is hot. In this session, we'll see 
    //           how Angular gets such great performance by preloading data on 
    //           your users devices before they even hit your site using the 
    //           new predictive algorithms and thought reading software 
    //           built into Angular 4.`,
    //           voters: []
    //         },
    //         {
    //           id: 4,
    //           name: "Angular 5 Look Ahead",
    //           presenter: "Brad Green",
    //           duration: 2,
    //           level: "Advanced",
    //           abstract: `Even though Angular 5 is still 6 years away, we all want 
    //           to know all about it so that we can spend endless hours in meetings 
    //           debating if we should use Angular 4 or not. This talk will look at 
    //           Angular 6 even though no code has yet been written for it. We'll 
    //           look at what it might do, and how to convince your manager to 
    //           hold off on any new apps until it's released`,
    //           voters: []
    //         },
    //         {
    //           id: 5,
    //           name: "Basics of Angular 4",
    //           presenter: "John Papa",
    //           duration: 2,
    //           level: "Beginner",
    //           abstract: `It's time to learn the basics of Angular 4. This talk 
    //           will give you everything you need to know about Angular 4 to 
    //           get started with it today and be building UI's for your self 
    //           driving cars and butler-bots in no time.`,
    //           voters: ['bradgreen', 'igorminar']
    //         }
    //       ]
    //     },
    //     {
    //       id: 2,
    //       name: 'ng-nl',
    //       date: '4/15/2037',
    //       time: '9:00 am',
    //       price: 950.00,
    //       imageUrl: '/assets/images/ng-nl.png',
    //       onlineUrl: 'http://ng-nl.org/',
  
    //       sessions: [
    //         {
    //           id: 1,
    //           name: "Testing Angular 4 Workshop",
    //           presenter: "Pascal Precht & Christoph Bergdorf",
    //           duration: 4,
    //           level: "Beginner",
    //           abstract: `In this 6 hour workshop you will learn not only how to test Angular 4, 
    //           you will also learn how to make the most of your team's efforts. Other topics
    //           will be convincing your manager that testing is a good idea, and using the new
    //           protractor tool for end to end testing.`,
    //           voters: ['bradgreen', 'igorminar']
    //         },
    //         {
    //           id: 2,
    //           name: "Angular 4 and Firebase",
    //           presenter: "David East",
    //           duration: 3,
    //           level: "Intermediate",
    //           abstract: `In this workshop, David East will show you how to use Angular with the new
    //           ultra-real-time 5D Firebase back end, hosting platform, and wine recommendation engine.`,
    //           voters: ['bradgreen', 'igorminar', 'johnpapa']
    //         },
    //         {
    //           id: 3,
    //           name: "Reading the Angular 4 Source",
    //           presenter: "Patrick Stapleton",
    //           duration: 2,
    //           level: "Intermediate",
    //           abstract: `Angular 4's source code may be over 25 million lines of code, but it's really 
    //           a lot easier to read and understand then you may think. Patrick Stapleton will talk
    //           about his secretes for keeping up with the changes, and navigating around the code.`,
    //           voters: ['martinfowler']
    //         },
    //         {
    //           id: 4,
    //           name: "Hail to the Lukas",
    //           presenter: "Lukas Ruebbelke",
    //           duration: 1,
    //           level: "Beginner",
    //           abstract: `In this session, Lukas will present the 
    //           secret to being awesome, and how he became the President 
    //           of the United States through his amazing programming skills, 
    //           showing how you too can be success with just attitude.`, 
    //           voters: ['bradgreen']
    //         },
    //       ]
    //     },
    //     {
    //       id: 3,
    //       name: 'ng-conf 2037',
    //       date: '5/4/2037',
    //       time: '9:00 am',
    //       price: 759.00,
    //       imageUrl: '/assets/images/ng-conf.png',
    //       location: {
    //         address: 'The Palatial America Hotel',
    //         city: 'Salt Lake City',
    //         country: 'USA'
    //       },
    //       sessions: [
    //         {
    //           id: 1,
    //           name: "How Elm Powers Angular 4",
    //           presenter: "Murphy Randle",
    //           duration: 2,
    //           level: "Intermediate",
    //           abstract: `We all know that Angular is written in Elm, but did you
    //           know how the source code is really written? In this exciting look
    //           into the internals of Angular 4, we'll see exactly how Elm powers
    //           the framework, and what you can do to take advantage of this knowledge.`,
    //           voters: ['bradgreen', 'martinfowler', 'igorminar']
    //         },
    //         {
    //           id: 2,
    //           name: "Angular and React together",
    //           presenter: "Jamison Dance",
    //           duration: 2,
    //           level: "Intermediate",
    //           abstract: `React v449.6 has just been released. Let's see how to use 
    //           this new version with Angular to create even more impressive applications.`,
    //           voters: ['bradgreen', 'martinfowler']
    //         },
    //         {
    //           id: 3,
    //           name: "Redux Woes",
    //           presenter: "Rob Wormald",
    //           duration: 1,
    //           level: "Intermediate",
    //           abstract: `Everyone is using Redux for everything from Angular to React to 
    //           Excel macros, but you're still having trouble grasping it? We'll take a look
    //           at how farmers use Redux when harvesting grain as a great introduction to 
    //           this game changing technology.`,
    //           voters: ['bradgreen', 'martinfowler', 'johnpapa']
    //         },
    //         {
    //           id: 4,
    //           name: "ng-wat again!!",
    //           presenter: "Shai Reznik",
    //           duration: 1,
    //           level: "Beginner",
    //           abstract: `Let's take a look at some of the stranger pieces of Angular 4,
    //           including neural net nets, Android in Androids, and using pipes with actual pipes.`,
    //           voters: ['bradgreen', 'martinfowler', 'igorminar', 'johnpapa']
    //         },
    //         {
    //           id: 5,
    //           name: "Dressed for Success",
    //           presenter: "Ward Bell",
    //           duration: 2,
    //           level: "Beginner",
    //           abstract: `Being a developer in 2037 is about more than just writing bug-free code. 
    //           You also have to look the part. In this amazing expose, Ward will talk you through
    //           how to pick out the right clothes to make your coworkers and boss not only
    //           respect you, but also want to be your buddy.`,
    //           voters: ['bradgreen', 'martinfowler']
    //         },
    //         {
    //           id: 6,
    //           name: "These aren't the directives you're looking for",
    //           presenter: "John Papa",
    //           duration: 2,
    //           level: "Intermediate",
    //           abstract: `Coinciding with the release of Star Wars Episode 18, this talk will show how
    //           to use directives in your Angular 4 development while drawing lessons from the new movie,
    //           featuring all your favorite characters like Han Solo's ghost and Darth Jar Jar.`,
    //           voters: ['bradgreen', 'martinfowler']
    //         },
    //       ]
    //     },
    //     {
    //       id: 4,
    //       name: 'UN Angular Summit',
    //       date: '6/10/2037',
    //       time: '8:00 am',
    //       price: 800.00,
    //       imageUrl: '/assets/images/basic-shield.png',
    //       location: {
    //         address: 'The UN Angular Center',
    //         city: 'New York',
    //         country: 'USA'
    //       },
    //       sessions: [
    //         {
    //           id: 1,
    //           name: "Diversity in Tech",
    //           presenter: "Sir Dave Smith",
    //           duration: 2,
    //           level: "Beginner",
    //           abstract: `Yes, we all work with cyborgs and androids and Martians, but 
    //           we probably don't realize that sometimes our internal biases can make it difficult for
    //           these well-designed coworkers to really feel at home coding alongside us. This talk will
    //           look at things we can do to recognize our biases and counteract them.`,
    //           voters: ['bradgreen', 'igorminar']
    //         },
    //         {
    //           id: 2,
    //           name: "World Peace and Angular",
    //           presenter: "US Secretary of State Zach Galifianakis",
    //           duration: 2,
    //           level: "Beginner",
    //           abstract: `Angular has been used in most of the major peace brokering that has
    //           happened in the last decade, but there is still much we can do to remove all
    //           war from the world, and Angular will be a key part of that effort.`,
    //           voters: ['bradgreen', 'igorminar', 'johnpapa']
    //         },
    //         {
    //           id: 3,
    //           name: "Using Angular with Androids",
    //           presenter: "Dan Wahlin",
    //           duration: 3,
    //           level: "Advanced",
    //           abstract: `Androids may do everything for us now, allowing us to spend all day playing 
    //           the latest Destiny DLC, but we can still improve the massages they give and the handmade
    //           brie they make using Angular 4. This session will show you how.`,
    //           voters: ['igorminar', 'johnpapa']
    //         },
    //       ]
    //     },
    //     {
    //       id: 5,
    //       name: 'ng-vegas',
    //       date: '2/10/2037',
    //       time: '9:00 am',
    //       price: 400.00,
    //       imageUrl: '/assets/images/ng-vegas.png',
    //       location: {
    //         address: 'The Excalibur',
    //         city: 'Las Vegas',
    //         country: 'USA'
    //       },
    //       sessions: [
    //         {
    //           id: 1,
    //           name: "Gambling with Angular",
    //           presenter: "John Papa",
    //           duration: 1,
    //           level: "Intermediate",
    //           abstract: `No, this talk isn't about slot machines. We all know that 
    //           Angular is used in most waiter-bots and coke vending machines, but
    //           did you know that was also used to write the core engine in the majority
    //           of voting machines? This talk will look at how all presidential elections
    //           are now determined by Angular code.`,
    //           voters: ['bradgreen', 'igorminar']
    //         },
    //         {
    //           id: 2,
    //           name: "Angular 4 in 60ish Minutes",
    //           presenter: "Dan Wahlin",
    //           duration: 2,
    //           level: "Beginner",
    //           abstract: `Get the skinny on Angular 4 for anyone new to this great new technology.
    //           Dan Wahlin will show you how you can get started with Angular in 60ish minutes, 
    //           guaranteed!`,
    //           voters: ['bradgreen', 'igorminar', 'johnpapa']
    //         }
    //       ]
    //     }
    //   ]

    //INJECTING SERVICE INTO THE EVENTS LIST COMPONENT
    //Injecting the service once it is registered.
    events: IEvent[] | undefined
    constructor(private eventService: EventService,  private route:ActivatedRoute){
        //not a good idea to put this in the constructor that are potentially long running
        //might take some time to fetch events hence not reasonable to place this here

        //this.events = this.eventService.getEvents()
    }

    //the constructor is required although it doesnt do anything because this is where the service gets injected.


    //components have lifecycle hooks that you can hook into
    //so that the lifecycle event is called when the component is being loaded.
    ngOnInit(){
    
        //this.events = this.eventService.getEvents()  //previously we were sending data directly

        //data sent using an observable. no need to use data because we will be getting data using resolver and it will be added to the route.
        //this.eventService.getEvents().subscribe(events => {this.events= events})

        this.events = this.route.snapshot.data['events']
    }

    // handleThumbnailClick(eventName: any){
    //     this.toastr.success(eventName)
    // }
} 

//INPUT AND OUTPUT PARAMS
//the event-thumbnail has in input parameter named event
//we want to pass the value from this component to another component

//[event] - matches the name of the input parameter
//event1 - matches the name of the member of our component

//when the event (eventClick) is fired on our thumbnail component then call the method 'handleEventClicked' on my component.
//the $event refers to the data emitted with our event.

// <event-thumbnail (eventClick)="handleEventClicked($event)" [event]="event1"></event-thumbnail>

//TEMPLATE VARIABLES
//Template variables allow you to specify a variable name that points to a component and then you can access all the methods and the properties using that variable
//Over here #thumbnail is the template variable via which we can access the public methods and properties of the child component
// #thumbnail is pointing to the event thumbnail component
//template variable can also be used if a parent wants to access some property of the child component. 
//The same functionality is demonstrated using the someProperty thing done above.
// <h3>{{thumbnail.someProperty}}</h3>
// <button class="btn btn-primary" (click) = "thumbnail.logFoo()">Log me some foo </button>

//SUMMARY OF COMMUNICATION BETWEEN COMPONENTS
//Hence, to handle inter-component communication we can do via three things: input properties, output properties and template variables.

//ngFor
//ngFor - used to iterate over array of objects / in case of repetition
//* before ngFor indicates that ngFor directive is a structural directive. Structural directives are different from other directives because they change the shape of DOM
//Structural directives actually add or remove HTML elements fromt the HTML document.
//ngFor actually adds item of an array hence it is prefaced with an asterisk sign.

//TOASTR:
//here toastr is used a service that will display pop-up messages on the right hand side whenever a particular component is clicked.

