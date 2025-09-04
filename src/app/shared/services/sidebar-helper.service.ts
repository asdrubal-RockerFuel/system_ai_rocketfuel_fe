import { Injectable } from "@angular/core";
import { SidebarDirective } from "../directives/sidebar.directive";

@Injectable({
  providedIn: "root",
})
export class SidebarHelperService {
  // Usamos un Record para mapear ids a instancias
  private sidenavInstances: Record<string, SidebarDirective> = {};

  constructor() {}

  /**
   * Set sidenav
   *
   * @param id - identificador único del sidebar
   * @param instance - instancia del SidebarDirective
   */
  setSidenav(id: string, instance: SidebarDirective): void {
    this.sidenavInstances[id] = instance;
  }

  /**
   * Get sidenav
   *
   * @param id - identificador único del sidebar
   * @returns instancia del SidebarDirective o undefined si no existe
   */
  getSidenav(id: string): SidebarDirective | undefined {
    return this.sidenavInstances[id];
  }
}
