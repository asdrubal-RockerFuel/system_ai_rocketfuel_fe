import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "relativeTime" })
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date) {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }

    const seconds: number = Math.floor(
      (new Date().getTime() - value.getTime()) / 1000
    );
    let interval: number = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return "Hace " + interval + " años";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return "Hace " + interval + " meses";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return "Hace " + interval + " días";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return "Hace " + interval + " horas";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return "Hace " + interval + " minutos";
    }
    return "Hace " + Math.floor(seconds) + " segundos";
  }
}
