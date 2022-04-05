import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISession } from '../shared/event.model';

@Injectable()
export class VoterService{

    constructor(private http: HttpClient){

    }
    
    deleteVoter(eventId: number,session: ISession, voterName: string): void{

        //whatever element in the voter array gets filtered out and everything else gets included
        //the new array that will be created will be all of the voters except for the one that matches the username
        session.voters = session.voters.filter(voter => voter !== voterName )
        
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

        this.http.delete(url).pipe(catchError(this.handleError('deleteVoter'))).subscribe()
    }

    addVoter(eventId: number, session: ISession, voterName: string): void{
        session.voters.push(voterName)

        const options = {headers: new HttpHeaders({'Content-Type': '/application/json'})}
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`
        
        //passed an empty object in the body because all the information has been passed in the url, otherwise normally we would send some data up
        //but just posting to this particular URL, causes the session to be voted to
        //here the post method is subscribed to itself rn, because whenever the method will be called, we dont care about the data which comes back
        //we dont care to be notified when it returns
        this.http.post(url, {}, options).pipe(catchError(this.handleError('addVoter'))).subscribe()
    }

    userHasVoted(session: ISession, voterName: string): boolean{
        //the some method is the method on array
        // it returns a boolean whether there is or isnt atleast one element that matches a specific condition
        //if there exists a name of the voter in the voter array then it will return true
        //so it will keep scanning till it finds atleast one method that returns true
        // if it reaches the end and none of them are the same, then it returns False
        return session.voters.some(voter => voter === voterName)
    }

    private handleError<T> (operation = 'operation', result?:T){
        return (error:any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}