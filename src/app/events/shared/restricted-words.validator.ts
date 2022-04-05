import {FormControl} from '@angular/forms'
    //Custom validator - returns a Javascript object of any type
    //Validation function is basically going to check if the controls value contains restricted words.
    export function restrictedWords (words: any[]) {
        return (control: FormControl) : {[key:string]:any} => {
            if(!words) return null
    
            const invalidWords = words
                .map((w: any)=> control.value.includes(w) ? w: null)
                .filter((w: null)=> w != null)
    
            return invalidWords && invalidWords.length > 0
            ? {'restrictedWords': invalidWords.join(', ')}
            : null
        }
    }