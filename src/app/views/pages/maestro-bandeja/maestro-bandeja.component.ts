import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { requirementsService } from 'src/app/shared/services/requirements.service';

@Component({
  selector: 'app-maestro-bandeja',
  templateUrl: './maestro-bandeja.component.html',
  styleUrls: ['./maestro-bandeja.component.scss']
})
export class MaestroBandejaComponent implements OnInit {
  loadData: boolean;

  constructor(
    private router: Router,
    private _sRequirement: requirementsService,
  ) { }

  ngOnInit(): void {
    this.getRequirements();
  }

  notificationArr:any[] = []

  entraRequerimiento(path: string) {
    this.router.navigate([path]);
  }

  getRequirements() {
    this.loadData = true;
    this._sRequirement.listRequirements(1, 10).subscribe(
      res => {
        console.log('res list req', res);
        this.loadData = false;
        this.notificationArr = res.data.rows;
      },
      err => {
        console.log('err list req', err);
        
      });
  }
}
