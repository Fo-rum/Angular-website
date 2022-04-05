import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http' ;
 
//creation of a barrel
import{
  EventsListComponent,
  EventThumnbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  //EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  UpVoteComponent,
  VoterService,
  LocationValidator,
  DurationPipe,
  EventResolver


} from './events/index'

import { EventsAppComponent } from './events-app.component';
//import { EventsListComponent } from './events/events-list.component';
//import { EventThumnbnailComponent } from './events/event-thumbnail.component';
import { NavBarComponent } from './nav/navbar.component';
//import { EventService } from './events/shared/event.service';
//import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import {JQ_TOKEN, TOASTR_TOKEN, Toastr, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective} from './common/index';

//import { EventDetailsComponent } from './events/event-details/event-details.component';
import { RouterModule, ActivatedRouteSnapshot, PreloadAllModules } from '@angular/router';
import { appRoutes } from './routes';
//import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { CollapsibleWellComponent } from './common/collapsible-well.component';
//import { EventRouteActivator } from './events/event-details/event-route-activator.service';
//import { EventListResolver } from './events/events-list-resolver.service';

//declare let toastr:Toastr
const toastr: Toastr = window['toastr']
const jQuery: Toastr = window['$']



@NgModule({

  //imports array is used for importing other modules
  //While importing the browser module, a number of core services and decorators
  //are available that are commonly used throughout the angular app

  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}), //to import route into our app
    HttpClientModule //imported all the client relevant classes and utilities into this module
  ], 

  //to declare services, pipes, components or directives must be declared here
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumnbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    UpVoteComponent,
    LocationValidator,
    ModalTriggerDirective, //directives are also listed under declarations like component
    DurationPipe
  ],


  //services are added as provoiders here
  providers: [
    EventService,

    //whenever somebody wants the toastr object, 
    //they have to ask for it using the TOASTR_TOKEN
    {provide: TOASTR_TOKEN, useValue: toastr }, //registration for the toastr object
    {provide: JQ_TOKEN, useValue: jQuery },
    //EventRouteActivator,
    EventResolver,
    EventListResolver,
    VoterService,

    //the longhand version of the above
    //Below is the useClass syntax for registering providers
    //{provide: Logger, useClass: FileLogger}

    //using useExisting which acts like a alias provider
    //used in a limited case - where we want to minimize the number of API
    //let us say Logger has 20-30 methods out of which 4-5 are used frequently
    //then it can be used. whenever we use MinimalLogger, it will load the Logger 
    //but the only methods which can be used are the 4-5 methods present on MinimalLogger
    //{provide: MinimalLogger , useExisting:Logger}

    //using useFactory to parameterize the creation of an object
    //a very complex way to create an instance of a class to create a service
    //{provide: Logger, useFactory:factory()}

    AuthService,
    {
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState
    } //if the value provided is canDeactiveCreateEvent, then use the value checkDirtyState. Once the call is made to this function, it will disable the functionality.
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if(component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true

}

//Route guards can be implemented either as a service or a function.
//canActivate was implemented as a service
//here we have implemented canDeactivate as a function.
//We have passed the component as the first parameter in the function checkDirty.
//it checks the state of the component, if it is dirty then pop up appears.