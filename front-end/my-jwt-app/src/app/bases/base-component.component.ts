import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
    template: '',
    standalone: true
})
export class BaseComponent implements OnDestroy {
    protected subscriptions: Subscription[] = [];

    constructor(){
        console.log('BaseComponent constructor called');
    }

    ngOnDestroy(): void {
        console.log('BaseComponent ngOnDestroy called');
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}