import { Component, OnInit, HostListener, ViewChildren, QueryList,
        EventEmitter, Input, Output} from '@angular/core';
import {
  NavigationService,
  IMenuItem,
  IChildItem
} from '../../../../services/navigation.service';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { companyService } from "src/app/shared/services/company.service";
import { FiltroService } from "src/app/shared/services/filtro.service";

import { filter } from 'rxjs/operators';
import { Utils } from '../../../../utils';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar-large',
  templateUrl: './sidebar-large.component.html',
  styleUrls: ['./sidebar-large.component.scss']
})
export class SidebarLargeComponent implements OnInit {
  rol: string;


  @Output() filtro = new EventEmitter<string>();

  // filtroInputValue: string;
  // filtroEmmit: string = 'Sector'
  // ubicacion: any [];
  // tamanio: any [];
  selectedItem: IMenuItem;
  nav: IMenuItem[];
  navContent: any [] = [];
  @ViewChildren(PerfectScrollbarDirective) psContainers:QueryList<PerfectScrollbarDirective>;
  psContainerSecSidebar: PerfectScrollbarDirective;

  constructor(public router: Router,
    public navService: NavigationService,
    public auth: AuthService,
    // private _sCompany: companyService,
    // private filtroService: FiltroService
    ) {
    setTimeout(() => {
      this.psContainerSecSidebar = this.psContainers.toArray()[1];
    });
    // this.filtroService.filtroActual.subscribe(filtro => {
    //   this.filtroEmmit = filtro
    // });
  }

  async ngOnInit() {
    this.rol = atob(localStorage.getItem("rol"));
    this.updateSidebar();

    // CLOSE SIDENAV ON ROUTE CHANGE
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(routeChange => {
        this.closeChildNav();
        if (Utils.isMobile()) {
          this.navService.sidebarState.sidenavOpen = false;
        }
      });

    try {
      const res = await this.auth.obtieneModulos2().toPromise(); // Convierte el Observable en una Promesa

      const modulesData = res.data;

      if (modulesData) {
        modulesData.forEach(item => {
          let row = {
            name: item.name,
            type: 'dropDown',
            description: '',
            icon: item.icon,
            sub: []
          };

          item.functionalities.forEach(element => {
            row.sub.push({
              name: element.name,
              type: "link",
              icon: element.icon,
              state: `/pages/${element.path}`,
            });
          });

          this.navContent.push(row);
        });
      }

      this.nav = this.navContent;
      this.setActiveFlag();
      
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  selectItem(item) {
    this.navService.sidebarState.childnavOpen = true;
    this.navService.selectedItem = item;
    this.setActiveMainItem(item);

    // Scroll to top secondary sidebar
    setTimeout(() => {            
      this.psContainerSecSidebar.update();
      this.psContainerSecSidebar.scrollToTop(0, 400);
    });
  }
  closeChildNav() {
    this.navService.sidebarState.childnavOpen = false;
    this.setActiveFlag();
  }

  onClickChangeActiveFlag(item) {
    this.setActiveMainItem(item);
  }
  setActiveMainItem(item) {
    this.nav.forEach(i => {
      i.active = false;
    });
    item.active = true;
  }

  setActiveFlag() {
    if (window && window.location) {
      const activeRoute = window.location.hash || window.location.pathname;
      this.nav?.forEach(item => {
        item.active = false;
        if (activeRoute.indexOf(item.state) !== -1) {
          this.navService.selectedItem = item;
          item.active = true;
        }
        if (item.sub) {
          item.sub.forEach(subItem => {
            subItem.active = false;
            if (activeRoute.indexOf(subItem.state) !== -1) {
              this.navService.selectedItem = item;
              item.active = true;
            }
            if (subItem.sub) {
              subItem.sub.forEach(subChildItem => {
                if (activeRoute.indexOf(subChildItem.state) !== -1) {
                  this.navService.selectedItem = item;
                  item.active = true;
                  subItem.active = true;
                }
              });
            }
          });
        }
      });
    }
  }

  updateSidebar() {
    if (Utils.isMobile()) {
      this.navService.sidebarState.sidenavOpen = false;
      this.navService.sidebarState.childnavOpen = false;
    } 
    // else {
    //   this.navService.sidebarState.sidenavOpen = true;
    // }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSidebar();
  }
}
