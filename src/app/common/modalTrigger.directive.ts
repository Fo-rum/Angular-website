import {Directive, ElementRef, Inject, Input, OnInit} from '@angular/core'
import { JQ_TOKEN } from './jQuery.service';

@Directive({
    selector: '[modal-trigger]' //put in square brackets to indicate that it is an attribute not element
})

export class ModalTriggerDirective implements OnInit{
//attach a click event handler to whatever element its created on
    private el: HTMLElement //ElementRef is like a wrapper, but we need the actual DOM element
    @Input('modal-trigger') modalId!: string; //this is the attribute property coming in and assign it to a property named modalId
 //this is the attribute property coming in and assign it to a property named modalId

    constructor(ref:ElementRef, @Inject(JQ_TOKEN) private $: any){
        this.el = ref.nativeElement
    }
    ngOnInit(){
        this.el.addEventListener('click', e=> {
            //this.$('#simple-modal').modal({}) //call the jQuery function and pass the id of the modal component
            //$ sign is the jQuery function
            //in modal method, empty object passed because it expects a configuration object
            //and we dont want to give it any actual configuration parameter
            this.$(`#${this.modalId}`).modal({})
        })
       
    }   
}

// here, we are calling this OnInit, but we dont wantt to call when it inits
// but instead we want to listen to the click event
// so need to get a handle to the element this directive is on and listen to its click event
//so in order to get the element we called upon ElementRef which is the Angular2's object
//ElementRef is the pointer to the specific element
//in the constructor, it tells that when this directive is constructed, we also need the reference to the element that its on

//also, our directive is present on the button in the navbar html file