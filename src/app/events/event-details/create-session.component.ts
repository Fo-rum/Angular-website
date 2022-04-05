import {Component, EventEmitter, OnInit, Output} from '@angular/core' 
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ISession, restrictedWords} from '../shared/index'

@Component({
    selector: 'create-session',
    templateUrl: './create-session.component.html',
    styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .error input, .error select, .error textarea {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder {color:#999;}
    .error ::-moz-placeholder {color:#999;}
    .error :-moz-placeholder {color:#999;}
    .error :ms-input-placeholder{color:#999;}
`]

})

export class CreateSessionComponent implements OnInit{
    @Output() saveNewSession = new EventEmitter() //creating an output parameter for our parent component to bind to.
    //this output property will emit data back to the parent component when the user clicks save.
    //the saveNewSession property will act as an event emitter.

    @Output() cancelAddSession = new EventEmitter() //to cancel the session and inform the event details component to exit out of the add Mode

    newSessionForm!: FormGroup   
    
    //here the form controls are declared publicly
    name!: FormControl
    presenter!: FormControl
    duration!: FormControl
    level!: FormControl
    abstract!: FormControl
        
    //defining form controls for each of the fields
    ngOnInit(){
            this.name = new FormControl('', Validators.required)
            this.presenter = new FormControl('', Validators.required)
            this.duration = new FormControl('', Validators.required)
            this.level = new FormControl('', Validators.required)
            this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])])


    this.newSessionForm = new FormGroup({
        name: this.name,
        presenter: this.presenter,
        duration: this.duration,
        level: this.level,
        abstract: this.abstract
        
    })
    }

    

    saveSession(formValues: any){
        //console.log(formValues)

        //using the service cuz the values' type maps to the one defined in the model
        const session: ISession = {
            id: undefined,
            name: formValues.name,
            duration: +formValues.duration,
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            voters: []
        }
        //console.log(session)
        
        //using the SaveNewSession event emitter to emit the session itself.
        this.saveNewSession.emit(session)
    }

    cancel(){
        this.cancelAddSession.emit()
    }

}

//A validator is just a function that returns null if valid and an error if its invalid.

//PASSING DATA OUT OF A CHILD COMPONENT (PT-2)
//When the cancel button is clicked in the Create session child component, we need to tell the event-details component know so that it can exit out of addMode.