import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private activatedRoute: ActivatedRoute){
        this.activatedRoute.queryParams.subscribe(params =>{
            console.log(params);
        })
    }
}