import { Component, OnInit } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [NgbPopoverModule], // 👈 aquí
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
