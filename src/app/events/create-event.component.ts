import { Component} from '@angular/core'
import {Router} from '@angular/router'
import {EventService} from './shared/index'

@Component({
    // template:`
    //     <h1>New Event </h1>
    //     <hr>
    //     <div class = "col-md-6">
    //         <h3>[Create Event Form will go here]</h3>
    //         <br/>
    //         <br/>
    //         <button type="submit" class="btn btn-primary">Save</button>
    //         <button type="button" class="btn btn-default" (click)="cancel()">Cancel</button>
    //     </div>
    
    // `
    templateUrl: 'create-event.component.html',
    styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder {color:#999;}
    .error ::-moz-placeholder {color:#999;}
    .error :-moz-placeholder {color:#999;}
    .error :ms-input-placeholder{color:#999;}
`]

})

export class CreateEventComponent{

    //newEvent object declared here
    newEvent: any
    //event:any

    //isDirty is the route guard added on the route for this component that looks at this dirty flag.
    //this will actually prevent us from navigating after we save unless we set dirty to false
    isDirty=true //saves the state of the component.
    constructor(private router:Router, private eventService:EventService){

    }

    // ngOnInit(){
    //     this.event = {
    //         name:'Ng Specs',
    //         date: '5/6/7897',
    //         time:'8 am',
    //         price:45.66,
    //         location:{
    //             address:'457 sad st',
    //             city:"flex",
    //             country:"abc"
    //         },
    //         onlineUrl: 'http://ngspecs.com',
    //         imageUrl: 'http://ngspecs.com/logo.png'

    //     }
    // }
    
    saveEvent(formValues: any){
        //console.log(formValues)
        
        //here the event service has been called to save the event. 
        //we can just pass formValues straight through since the shape of it exactly matches our eventModel.
        this.eventService.saveEvent(formValues).subscribe(() => {
            this.isDirty = false //making sure route guard allows us to navigate to that page
            this.router.navigate(['/events'])
        }) 
    
    }

    cancel(){
        this.router.navigate(['/events'])
    }
}

//the above is the demonstration of an inline template.
//When you click on the cancel button, it must take us back to the all events page.
//So we have called navigate on the router and have passed in the route that we want to navigate to.
//So we have injected the router and call navigate.