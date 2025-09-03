import { Component, OnInit } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    standalone: true,
    imports: [NgbRatingModule]
})
export class RatingComponent implements OnInit {
    currentRate = 8;
    heartRating = 3;
    demoRating = 4.4;
    constructor() { }

    ngOnInit() {
    }

}
