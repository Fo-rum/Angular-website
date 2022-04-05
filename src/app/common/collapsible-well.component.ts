import {Component, Input} from '@angular/core'

@Component({
    selector: 'collapsible-well',
    template:`
    <div (click) = "toggleContent()" class = "well pointable">
        <h4>
            <ng-content select="[well-title]"></ng-content>
        </h4>
   
        <ng-content *ngIf="visible" select="[well-body]"></ng-content>
      
    </div>
    
    
    `
})

export class CollapsibleWellComponent{
    //@Input() title!: string;
    visible = true;

    toggleContent(){
        this.visible = !this.visible
    }
}

//the ng-content is the special tag which tells HTML that whatever the content of session 
//that is what exists inside of the component, then this has to be put right here and inside of it
//ngif = visible inside ng-content means that the functionality will work to toggle the body content

//here when we click we will be able to toggle the content inside of a session
// <div (click) = "toggleContent()" class = "well pointable">

//this component uses CONTENT PROJECTION. thus, we have demonstrated how to make use of a resuable component.

//the first ng-content is placed because thats where we want our title and the fire icon to be present
//the second ng-content is where we want the remaining part of the body to be present

//the select tells angular2 to match up the correct content with the one present inside session-list.component.html
//therefore, correct content is matched up with the correct piece of HTML based on the class selectors.
//here the select attribute works like any CSS selector.

//MULTIPLE CONTENT PROJECTION
//demonstrated by use of a fire sign

//therefore using CONTENT PROJECTION we can create components whose reusable pieces are limited to just the external portions of the component and the inner pieces can be different based on the needs of the application.