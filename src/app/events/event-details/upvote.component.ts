import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
    selector: 'upvote',
    styleUrls: ['./upvote.component.css'],
    template:`
        <div class="votingWidgetContainer pointable" (click)="onClick()">
            <div class="well votingWidget">
                <div class="votingButton">
                    <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
                    
                <div>
                <div class="badge badge-inverse votingCount">
                    <div>{{count}}</div>
                </div>
            </div>
        </div>

    `
})

export class UpVoteComponent{
    @Input() count!: number

    //this is an input setter inorder to create a derived value from an input property
    @Input() set voted(val: any){
        this.iconColor = val ? 'red' : 'white'
    }
    @Output() vote = new EventEmitter()

    //this will change the color of the heart to white or red based on whether they have voted or not
    iconColor!: string

    onClick(){
        this.vote.emit({})
    }
}

// <i *ngIf="voted" class="glyphicon glyphicon-heart"></i>
// <i *ngIf="!voted" class="glyphicon glyphicon-heart-empty"></i>