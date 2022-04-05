import {InjectionToken} from '@angular/core'

export const JQ_TOKEN = new InjectionToken<Object>('jQuery')

//the jQuery interface is very difficult to implement unlike the toastr service
//hence we dint implement it here