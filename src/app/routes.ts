//Routes defined for an application are going to be an array of route objects.

import { Routes } from '@angular/router'
import{
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    //EventRouteActivator,
    EventListResolver,
    CreateSessionComponent,
    EventResolver
} from './events/index'

import { Error404Component } from './errors/404.component';
//import { CreateEventComponent } from './events/create-event.component';
//import { EventDetailsComponent } from "./events/event-details/event-details.component";
//import { EventRouteActivator } from './events/event-details/event-route-activator.service';
//import { EventsListComponent } from "./events/events-list.component";
//import {EventListResolver} from "./events/events-list-resolver.service";


export const appRoutes:Routes = [
    {path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
    {path: 'events', component: EventsListComponent, resolve: {events:EventListResolver}},
    //{path: 'events/:id', component: EventDetailsComponent, canActivate:[EventRouteActivator]},
    {path: 'events/:id', component: EventDetailsComponent, resolve:{event:EventResolver}},
    {path: 'events/session/new', component:CreateSessionComponent},
    {path:'404', component: Error404Component},
    {path: '', redirectTo: '/events', pathMatch:'full'},
    //{path:'user', loadChildren:'./user/user.module#UserModule'}
    {path:'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
}



    
]

//basically we have created routes
// in the events-app.component.ts, we have specified the router outlet
// the first path is: if the URL matches /events, then load that particular EventsListComponent
// the second route has the :id which is parameter placeholder and expects a value to be passed in on the route.
//the third route is if the user wants to navigate to the root , then that will also display the Eventlist page.
//the third path is that if the path is empty or we are at the root of our site, then redirect it to the events page. 
//Generally, redirect require a pathMatch property. It is either prefix or full.
//Prefix means redirect if the URL starts with the specified path string and full means redirect if it fully matches the specified path string.

//Angular provides a typescript definition for the router config that will give us some extra IntelliSense and compile-time safety if we add it.

//GUARDING A ROUTE - sometimes we want to prevent a user from going to a particular page or must discourage them from leaving the page. This is done using a route guard.
//Canactivate is used to prevent a user from navigating to a page.
//canDeactivate is used to prevent a user from leaving a page. Can be used if to warn a user from a page before saving their data.

//we added a resolve to the Eventlistcomponent. it has a property: events and the value is set to the eventlistresolver. before loading this component, call the eventlistresolver. it will send us some data.
//and then add this data to the route /events

//Since we have created another user module, we have added a path to it. /user
//Also, since we want to load its children: we have to pass a string that is parsed by angular in two parts. The first path is the path to the file where your new module is and the second path follows a hash sign which is the name of the module.