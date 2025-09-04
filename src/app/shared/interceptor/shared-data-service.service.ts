import { Injectable } from "@angular/core";
import { Module } from "../interfaces/Module.interface";

@Injectable({
  providedIn: "root",
})
export class SharedDataService {
  public modules: any[] = [];

  constructor() {
    // Recuperar datos de sessionStorage al crear el servicio
    const modulesData = sessionStorage.getItem("modulesData");
    if (modulesData) {
      this.modules = JSON.parse(modulesData);
    }
    console.log("modules", this.modules);
  }

  /** Guardar módulos en sessionStorage */
  setModules(modules: any[]): void {
    this.modules = modules;
    sessionStorage.setItem("modulesData", JSON.stringify(modules));
  }

  /** Obtener módulos desde el servicio */
  getModules(): Module[] {
    return this.modules;
  }
}
