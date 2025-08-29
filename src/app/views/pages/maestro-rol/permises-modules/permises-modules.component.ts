import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IModulesWithOperations, IResponse, permisosService } from "src/app/shared/services/permises.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-permises-modules",
  templateUrl: "./permises-modules.component.html",
  styleUrls: ["./permises-modules.component.scss"],
})
export class PermisesModulesComponent implements OnInit {
  constructor(
    private _sDPermises: permisosService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  id;
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.obtenerOficinas();
  }

  obtenerOficinas() {
    this._sDPermises.getpermisos(this.id).subscribe((data: IResponse<IModulesWithOperations[]>) => {
      console.log(data, "s");
      this.arregloModulos = data.data;
      this.arregloModulosSave = JSON.parse(JSON.stringify(this.arregloModulos)); // Guardamos una copia para validar que cambios se realizo
                                                             // Usamos Json porque se tiene que hacer una copia profunda
      this.mensajeCargando = 'Guardar';
    });
  }
  getColorStyle(method: string): string {
    switch (method) {
      case "GET":
        return "text-success"; // Clase para borde verde
      case "DELETE":
        return "text-danger";
      case "POST":
        return "text-adver"; // Clase para borde rojo
      case "PUT":
      case "PATCH":
        return "text-info"; // Clase para borde azul
      default:
        return ""; // Clase predeterminada si no coincide con ninguno de los métodos anteriores
    }
  }

  getBorderStyle(method: any): string {
    // console.log("e", method);
    switch (method) {
      case true:
        return "border-red"; // Clase para borde verde
      case false:
        return "border-blue";

      default:
        return ""; // Clase predeterminada si no coincide con ninguno de los métodos anteriores
    }
  }

  arregloModulosSave = [];

  arregloModulos = [
    /*  {
      id: 1,
      vistaFe: "Maestro Áreas",
      description: "Rutas del área",
      activeFe: 1,
      rotues: [
        {
          id: 1,
          method: "GET",
          route: "/area/list",
          active: 0,
        },
        {
          id: 2,
          method: "POST",
          route: "/area/create",
          active: 1,
        },
        {
          id: 3,
          method: "PUT",
          route: "/area/update",
          active: 1,
        },
        {
          id: 4,
          method: "PUT",
          route: "/area/disabled",
          active: 0,
        },
      ],
    },

    {
      id: 2,
      vistaFe: "Maestro Programa e iniciativa",
      description: "Rutas de programa e iniciativa",
      activeFe: 1,
      rotues: [
        {
          id: 1,
          method: "GET",
          route: "/programa/list",
          active: 0,
        },
        {
          id: 2,
          method: "POST",
          route: "/programa/create",
          active: 1,
        },
        {
          id: 3,
          method: "PUT",
          route: "/programa/update",
          active: 0,
        },
        {
          id: 4,
          method: "PUT",
          route: "/programa/disabled",
          active: 1,
        },
      ],
    }, */
  ];

  mensajeCargando : string = 'Guardar';
  prueba()
  {
    
    this.mensajeCargando = 'Guardando...';
    let data : SetModulesAndOperationsDto =
    {
      roleId: this.id,
      modules: {
        add: [],
        remove: []
      },
      operations: {
        add: [],
        remove: []
      }
    }

    this.arregloModulos.forEach((element : any, index : number) => 
    {
      if (element.is_in_use !== this.arregloModulosSave[index].is_in_use)
      {
        (element.is_in_use) ? data.modules.add.push(element.module_id) : data.modules.remove.push(element.module_id)
      }

      element.operations.forEach((elemento : any, indice : number)  => 
      {
        if (elemento.is_in_use !== this.arregloModulosSave[index].operations[indice].is_in_use)
        {
          (elemento.is_in_use) ? data.operations.add.push(elemento.id) : data.operations.remove.push(elemento.id)
        }
      });

    });

    if (data.modules.add.length === 0 && data.modules.remove.length === 0 && 
      data.operations.add.length === 0 && data.operations.remove.length === 0)
    {
      this.mensajeCargando = 'Guardar';
      this.toastControl('¡No se realizaron cambios!', '', 3);
      return;
    }

    this._sDPermises.savePermisos(data).subscribe((data2 : IResponse<SetModulesAndOperationsDto>)=>
    {
      // this.toastControl('¡Se guardo correctamente!', 'EXITOSAMENTE', 3);
      this.toastControl(data2?.message, 'Guardado', 3);
      this.obtenerOficinas();
    }, error =>
    {
      this.mensajeCargando = 'Guardar';
      this.toastControl('Error!', 'Ups, ocurrió un error!', 2);
    })
  }

  toastControl(mensaje : string, titulo : string, tipo : number = 1)
  {
    let datoToastr = {
      timeOut: environment.timeOutmessage,
      closeButton: true,
      progressBar: true,
    };

    switch (tipo)
    {
      case 1: this.toastr.success(mensaje, titulo, datoToastr); return; // satisfactorio
      case 2: this.toastr.error(mensaje, titulo, datoToastr); return; // error
      case 3: this.toastr.info(mensaje, titulo, datoToastr); return; // información
    };
  }  
}

interface AddRemove {
  add?: number[];
  remove?: number[];
}

export interface SetModulesAndOperationsDto {
  roleId: number;
  modules?: AddRemove;
  operations?: AddRemove;
}