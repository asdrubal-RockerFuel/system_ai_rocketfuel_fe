import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root", // Esto asegura que el servicio sea un singleton
})
export class SharedDataService {
  public modules: any[]; // Define una propiedad para almacenar los módulos obtenidos

  constructor() {
    this.modules = [];
    console.log("modules", this.modules); // Inicializa la propiedad en un arreglo vacío
  }
  ngOnInit() {
    // Intenta recuperar los datos de sessionStorage
    const modulesData = sessionStorage.getItem("modulesData");
    if (modulesData) {
      this.modules = JSON.parse(modulesData);
      console.log("modules", this.modules);
    } else {
    }
  }
}
