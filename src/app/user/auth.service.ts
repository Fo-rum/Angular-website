import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IUser } from './user.model'

@Injectable()
export class AuthService{
    
    //current user is of the type IUser
    //currentUser: IUser 
    currentUser: any

    constructor(private http: HttpClient){

    }
    //the main purpose of the login method is to set the current user when the user logs in
    //INTEGRATING AUTHENTICATION WITH THE SERVER
    loginUser(userName:string, password:string){
        
        const loginInfo = { username: userName, password: password} //here the server expects 'username' property.
        const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

        //on the server we are posting the loginInfo which comprises of the username & the password
        //'tap' is the way to tap into the stream and take an action when a piece of data comes through the observable
        return this.http.post('/api/login', loginInfo, options).pipe(tap((data:any) => {
            this.currentUser = <IUser>data['user']; //took the data object, grabbed its user property and casted it to an Iuser
        }))
        .pipe(catchError(err => {
            return of(false) //creating an observable of false
        }))

        // this.currentUser ={
        //     id:1,
        //     userName: userName,
        //     firstName: 'John',
        //     lastName: 'Papa'
        // }
    }

    //method to check if the user is authenticated or not
    isAuthenticated(){
        return !!this.currentUser;
    }

    checkAuthenticationStatus(){
        //the url returns no value if the user is not logged in
        //but if the user is logged in then it returns their current identity as an object
        // this.http.get('/api/currentIdentity').subscribe(data => {
        //     if(data instanceof Object) {
        //         this.currentUser = <IUser>data
        //     }
        // })

        //can use two methods either subscribe above or tap
        //one benefit of doing it this way inside of tap method is later on when we actually return the observables and the consumers of the checkAuthenticationStatus actually subscribe and take an action based on data that comes back
        return this.http.get('/api/currentIdentity').pipe(tap(data => {
            if(data instanceof Object) {
                this.currentUser = <IUser>data
            }
        }))
        
    }
    
    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

        const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options)
    }

    //implementing the logout function. it is an http request
    logout(){
        this.currentUser = undefined //finally the client will know that the user will be logged out
        const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}
        return this.http.post('/api/logout', {}, options)

    }
}

//note: it is important to what the URl is on the server for the endpoint you are working with 
//and you need to know the shape of the data to be sent up or the shape of the data which is coming back so you can interact with them on the client

//passed a callback function to tap which receives the data item that is going through the observable and will take an action based on that

//NOTE: It is important to know that when you are interacting with your server on the client , you must know:
// 1. what your API endpoints look like
// 2. what methods they require
// 3. what URLs are
// 4. what data they accept and return