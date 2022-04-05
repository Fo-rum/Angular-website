import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, Resolve} from '@angular/router'
import { EventService } from './shared/event.service'

@Injectable()
export class EventResolver implements Resolve<any>{
    constructor(private eventService:EventService){


    }
    resolve(route: ActivatedRouteSnapshot){

        //in order to get the id which is being accessed when we have a resolver on a route that has the route parameter
        return this.eventService.getEvent(route.params['id'])

       
    }   
    
}

//created a resolver, this will actually resolve the data before we actually hit the page