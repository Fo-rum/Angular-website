import {Component, EventEmitter, Input, Output} from '@angular/core'
import { IEvent } from './shared/index'

@Component({
    selector: 'event-thumbnail',
    template: `
        <div [routerLink]="['/events', event.id]" class ="well hoverwell thumbnail">
        <h2>{{event?.name | uppercase}}</h2>
        <div>Date: {{event?.date | date: 'shortDate'}} </div>
        <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">Time: {{event?.time}} 
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
        </div>
        <div>Price: {{event?.price | currency:'USD'}} </div>
        <div *ngIf="event?.location">
            <span>Location: {{event?.location?.address}} </span>
            <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}} </span>
        </div>
        <div *ngIf="event?.onlineUrl">
            Online URL: {{event?.onlineUrl}}
        </div>

    </div>
    `,
    styles:[`
        .green {color: #003300 !important;}
        .bold { font-weight:bold; }
        .thumbnail {min-height: 210px;}
        .pad-left {margin-left:10px;}
        .well div {color: #bbb;}
    `]
})

export class EventThumnbnailComponent{

    //now event that will be returned will be of the type IEvent.
   @Input() event:IEvent | undefined //this input decorator tells Angular that the event will be passed in from another component
//    @Output() eventClick = new EventEmitter()

//    handleClickMe(){
//        //console.log('clicked!')
//        this.eventClick.emit(this.event.name)
//    }
    // someProperty:any = "some value"

    // logFoo(){
    //     console.log('foo')
    // }

    getStartTimeClass(){

        //one approach
        //const isEarlyStart = this.event && this.event.time === '8:00 am'
        //return {green: isEarlyStart, bold: isEarlyStart}

        //another approach
        if (this.event && this.event.time === '8:00 am')
            return ['green', 'bold']
        return []
    }

    //Style binding using function
    // getStartTimeStyle():any {
    //     if (this.event && this.event.time === '8:00 am')
    //         return {color:'#003300', 'font-weight': 'bold'}

    //     return {}
    // }  


}


//note the use of double braces {{event.name}} is known as one-way binding
//this is interpolation
//putting anything within the double braces, then angular will look for the object on the component
//in the above case, angular wil look for the EventsListComponent class and it will expect an object 'event'

//here the thumbnail component is receiving data from the parent component via its input parameter
//to pass the data just create input parameter or property on a component and then pass data to it using square bracket binding
//the above process is known as passing data from parent to child
//Input parameters are used when constructing a child component in order to give a child component its data.
//Output is quite often used in response to some event within a child component so that the parent can receive information when an event like 'click' occurs within the child component.

// <button class = "btn btn-primary" (click) = "handleClickMe()">Click Me!</button>


//HANDLING NULL VALUES VIA SAFE NAVIGATION OPERATOR:
//if the events-list.component.ts missed this statement [event]="event", then in the thumbnail class all the boxes would be empty because of null values
// to handle this case, we handle the null values with the safe navigation operator which is appending a question mark (event.name) --> event?.name
// also notice (event?.location.address) we write it like (event?.location?.address) because the safe navigation operator shortcircuits the evaluation of the expression so that you dont have to put it everywhere.
//in other words, location won't ever be undefined if the event is defined.
//But let us consider one edge case where the location is missing for a valid event in that case (event?.location?.address) will be mandatory otherwise it would throw some error.

//HIDING AND SHOWING CONTENTS WITH ngIF:
//ngIf is a built-in structural directive that allows us to show content only when an expression evaluates to be true
//if the location is set, then ngIf will do nothing. if the expression evaluataes to be False, then it will remove the element completely from the DOM.

//HIDING CONTENT WITH THE HIDDEN BINDING
//in the below example, using ngIf would never render the element in the DOM if it is not present
// <div *ngIf="event?.onlineUrl">
//             Online URL: {{event?.onlineUrl}}
//         </div>
//But, we can use the hidden property that would bind the element to it. if the element is absent, then it would be rendered in the DOM, but would stay hidden.
// <div [hidden]="!event?.onlineUrl">
//             Online URL: {{event?.onlineUrl}}
//         </div>
//Thefore, the ngIf is used to change the visibility of the elements and you can also use the hidden property to bind it to the DOM object.

//HIDING AND SHOWING CONTENT WITH ngSwitch:
//it is used for multiple values. along with ngSwitch the safe navigation operation is used to act like a guard against null values.
//above, the ngSwitchcase is bound to a string value.
//the ngSwitch is using ("?event.time") which is a string, hence th ngSwitchcase values are also strings. But, then ngSwitch can check for any data type and the ngSwitch case must return the same values.

//BASIC COMPONENT STYLING
//CLASS BINDING
//<div [class.green]="event?.time === '8:00 am'" [ngSwitch]="event?.time">Time: {{event?.time}} 
//the above class is a class binding which checks that if the expression evaluates to be True, then it will be made green. It looks like a property binding but it isnt one. There doesn't a class.green property so we added .green to styles array.
//But, the above one is used to toggle a single class only

//ngClassDirective
//It is used to toggle multiple classes. If we want both green & bold, then it wont be possible using a class binding.
//in the ngClass, the keys are the names of the classes that you want to add and the values are a Boolean expression that determines whether or not the class should be shown.
//<div [ngClass]="{green:event?.time === '8:00 am', bold:event?.time === '8:00 am'}" [ngSwitch]="event?.time">Time: {{event?.time}} 
//The above is replaced with a function because the same thing was being computed twice. 

//STYLE BINDING
//<div [style.color]="event?.time === '8:00 am' ? '#003300' : '#bbb'" [ngSwitch]= "event?.time">
//only one style applied
//for multiple styles, use ngStyle
//<div [ngStyle]="{'color':event?.time === '8:00 am' ? '#003300' : '#bbb', 'font-weight':event?.time === '8:00 am' ? 'bold' : 'normal'}" [ngSwitch]="event?.time">Time: {{event?.time}} 
//the keys or the property names of the object are styles are color and font-weight and the values are a ternary statement that will set those values based on true or false

//Style binding Using function
//<div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">Time: {{event?.time}} 

//LINKING PAGES USING ROUTING
//[routerLink]="['/events', event.id]" -> HERE in the div tag itself, we are creating a route. it will go to /events and will then add eventid. will navigate to the respective page.
//Notice that the expression of the router link takes in an array. This array is basically a list of path segments followed by the parameters. 

//USING BUILT-IN PIPES
//event?.name | uppercase} - here we are changing the events name to full Uppercase