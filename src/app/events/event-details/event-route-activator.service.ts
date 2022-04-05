// import { ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router"
// import {Injectable} from "@angular/core"
// import { EventService } from "../shared/event.service"

// @Injectable()
// export class EventRouteActivator implements CanActivate{
//     constructor(private eventService:EventService, private router:Router){

//     }

//     //look up the event and will grab the event ID off the route
//     canActivate(route:ActivatedRouteSnapshot){

//         //load the event here and if it doesnt return a valid event navigate to 404 page.
//         //the below guard on the event details page is no longer valid because it returns an observable and not an event
//         const eventExists= !!this.eventService.getEvent(+route.params['id'])

//         //navigate to the 404 page if the event doesnt exist.
//         //if the event exists then the route will be activated otherwise it'll return False
//         if (!eventExists)
//             this.router.navigate(['/404'])
//         return eventExists
//     }
// }

// // we will check if the event id present is valid or not. 
// // + sign is added before route.params to cast the ID to a number here.

//above page can be deleted because it will no longer be required