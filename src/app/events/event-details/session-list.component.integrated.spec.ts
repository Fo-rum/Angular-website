import { Component, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { CollapsibleWellComponent } from "src/app/common"
import { AuthService } from "src/app/user/auth.service"
import { DurationPipe } from "../shared"
import { SessionListComponent } from "./session-list.component"
import { UpVoteComponent } from "./upvote.component"
import { VoterService } from "./voter.service"

//making a MOCK COMPONENT
// @Component({
//     selector: 'upvote'
// })

// class MockUpvoteComponent {

// }

describe('SessionListComponent', () => {

    let mockAuthService,
        mockVoterService,
        //fixture is a wrapper around the actual component
        fixture: ComponentFixture <SessionListComponent>,
        component: SessionListComponent,

        //there are two ways to work with the template: Native Element way
        element: HTMLElement,
        debugEl: DebugElement

    beforeEach(() => {
        mockAuthService = {isAuthenticated: () => true, currentUser: {userName: 'Joe'}} //every initialization should be inside beforeEach and not outside
        mockVoterService = { userHasVoted: () => true}
        //this method actually creates a testing module
        // it is like a mini module
        // like a tiny version of the app module that contains the components that we are trying to test
        TestBed.configureTestingModule({
            // it contains an object that would have the same specification which we would put into the app module

            declarations:[
                SessionListComponent,
                DurationPipe,
                //MockUpvoteComponent,
                // CollapsibleWellComponent,
                // UpVoteComponent
            ],
            
            providers:[
                {provide: AuthService, useValue: mockAuthService},
                {provide: VoterService, useValue: mockVoterService}

            ],
            schemas: [
                //array where you pass in the different schemas to be used
                //Angular uses a schema that tells you if it encounters an element that is not a standard HTML element but also not an element that it knows about

                //we use this schema to ignore those issues
                // this is an example of shallow integration test
                // here we are ignoring the child components rather than dealing with them through either deep integration test or creating mock components specifically to simulate those children
                NO_ERRORS_SCHEMA
            ]
        })
        fixture = TestBed.createComponent(SessionListComponent)

        component = fixture.componentInstance; //get a handle of the component
        debugEl = fixture.debugElement // get the handle of the debug element
        element = fixture.nativeElement // get the handle of the html template
    })

    describe('initial display', () => {

        it('should have the correct name', () => {

            //ARRANGE
            component.sessions = [
                {name: 'Session 1', id: 3, presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract',
                 voters: ['john', 'bob']}
            ]
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;
            component.ngOnChanges();

            //ACT- really kind of CHANGE DETECTION
            //the template gets updated once the bindings in the template get updated
            // eg: {{session.name}} it is a binding. and bindings aint updated until the change detection runs.
            fixture.detectChanges() //it will call the changedetection cycle, fire off and will update all the bindings in the template

            //expect(element.querySelector('[well-title]')?.textContent).toContain('Session 1')
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1')
        })
    })
})

//TESTING COMPONENT WITH THE INTEGRATED TESTS

//therefore, the configureTestingModule creates a module that can create the session list
// and the create component actually creates the sessionlistcomponent

//here querySelector is used to get the raw DOM node
// & the textContent actually gets the inner text of the DOM node we are dealing with and creates text out of it and gives it us to as a big long string

//the debugElement and the native element are very similar to each other. 
// basically the debug element is the wrapper that angular has created around the raw DOM API
//every debug element has this nativeElement property that goes from this debug element down to the native DOM API element
//therefore the two methods debugElement and the nativeElement are analogous to each other: -
//1.both are used to way through and get pieces of DOM
//2. get handle to various pieces of template
//3. and then check things such as the binding completed correctly.
//4. has the text been inserted correctly or not

//Note: we can go down from debug element to the nativeElement but not vice versa. the debug element is the wrapper around the native element

//A deep integration test, tests the parent component and its children
//whereas a shallow integration test only tests the parent component and not its children

//the deep test let us test the component and any component it uses in its template plus the directive and pipes
// A shallow test favors just testing a single component in isolation 