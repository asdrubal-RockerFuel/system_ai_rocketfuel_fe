import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "bootDash";

  constructor(private router: Router) {}

  token = localStorage.getItem("pucoToken");

  ngOnInit() {
    /*  if (this.token != null) {
      this.router.navigate(["/pages/maestro-cotizaciones"]);
    } */
  }
}
