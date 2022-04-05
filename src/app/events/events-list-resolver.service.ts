
import {Injectable} from '@angular/core'
import {Resolve} from '@angular/router'
import { EventService } from './shared/event.service'
import {map} from 'rxjs/operators'

@Injectable()
export class EventListResolver implements Resolve<any>{
    constructor(private eventService:EventService){


    }
    resolve(){
        //return this.eventService.getEvents().pipe(map(events => events))
        return this.eventService.getEvents()

        //Angular has a built service that the resolver subscribes to an observer it gets
        //thus here we dont need to subscribe to the call
        //but if we used this service inside some other component then we would have to subscribe to this observable with a call to .subscribe
        //the reason we need to do that is with HTTP observables, the HTTP request doesnt get made until somebody actually subscribes to the observable

        //note: HTTP call will not execute until somebody subscribes to the observable
    }   
    
}

//this is an injectable service that makes use of the resolve method.
//the resolve method will typically make an async call like an AJAX call. will return the data when it return
//first getEvents returns an observable. and then map gives us access to the events that are passed in on that stream.

//when you listen to an observable, we use the subscriber method.
//but because this is in a resolver, we actually need to return the observable to angular so that angular can watch the observable and see when it finishes.
//Subscribe returns a subscription, not an observable. so if we would hv used the subscribe method then the value returned would not be an observable.

//map will return the events as an observable and then these events will then get passed along to the component defined in the route.
