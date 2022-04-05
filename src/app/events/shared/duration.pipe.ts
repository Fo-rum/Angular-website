import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name:'duration' //name of the pipe
})

export class DurationPipe implements PipeTransform{

    transform(value:number):string{
        switch(value){
            case 1: return 'Half Hour'
            case 2: return 'One Hour'
            case 3: return 'Half Day'
            case 4: return 'Full Day'
            default: return value.toString();
        }
    }
}

//the transform function takes an input value and returns an output value

//here we have used the transform function, because initially the duration is 1,2,3 etc
//but we want the duration to be either half hour, one hour etc
//thus initially the value is number which will be the first parameter and we will be returning a string
//also the switch has been designed to handle every duration and then return its corresponding string