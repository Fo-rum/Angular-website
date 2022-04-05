import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core'

import {JQ_TOKEN} from './jQuery.service'

@Component({
    selector: 'simple-modal',
    template: `
    <div id="{{elementId}}" #modalcontainer class="modal fade" tabindex = "-1">
    <div class="modal-dialog">
        <div class ="modal-content">
            <div class ="modal-header">
                <button type ="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                <h4 class="modal-title">{{title}}</h4>
            </div>
            <div class="modal-body" (click)="closeModal()">
                <ng-content></ng-content>
            </div>
        </div>
    </div>
</div>

    `,
    styles: [`
        .modal-body {height:250px; overflow-y: scroll;}
    `]

})

//if you are using the bootstrap modal component, then an id must be given
//this id is the id of the modal itself

export class SimpleModalComponent{
    @Input() title!: string
    @Input() elementId!: string
    @Input()
    closeOnBodyClick!: string

    //ref is available as indicator for View Child
    //containerEl is going to be initialized with this SimpleModalcomponent to point at this specific DOM (first div)
    //acts a like a wrapper
    @ViewChild('modalcontainer') containerEl!: ElementRef //pass the string that will be angular local ref variable
//pass the string that will be angular local ref variable

    constructor(@Inject(JQ_TOKEN) private $:any){

    }
    closeModal(){
        //if it is true, then we will close it and if it is false it wont
        if(this.closeOnBodyClick.toLocaleLowerCase() === "true"){
        //pass the actual DOM node- raw DOM node that is the modal
        //hide-> to close down the modal dialog
        //if we want the raw DOM element that this containerEL wraps: this.containerEl.nativeElement
        //we get the underlying DOM element that this containerEl points to, which is found by looking up the ref for modalcontainer
        //this is another way of accessing a specific DOM node. first method was shown in modalTrigger by using elementRef.nativeelement
        this.$(this.containerEl.nativeElement).modal('hide') 
        }
    }
}

//to refer to a spefic element put a ref symbol -> #modalcontainer declared inside div

//here we have used ViewChild, but we can also use ViewChildren if there are list of elements with the same reference
//eg: if we had ngFor for iterating over list of items and we wanted to get a reference to the entire collection
// and then to access the child we have to use ContentChild instead of ViewChild