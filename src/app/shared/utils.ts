export class Utils {
  /** Detecta si el dispositivo es móvil según el ancho de pantalla */
  static isMobile(): boolean {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches
    );
  }

  /** Convierte un objeto NgbDateStruct a Date */
  static ngbDateToDate(
    ngbDate: { month: number; day: number; year: number } | null
  ): Date | null {
    if (!ngbDate) {
      return null;
    }
    // Ajuste seguro para evitar errores con Date inválida
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  /** Convierte un Date a objeto NgbDateStruct */
  static dateToNgbDate(
    date: Date | string | null
  ): { month: number; day: number; year: number } | null {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null; // Manejo de fechas inválidas
    return {
      month: d.getMonth() + 1,
      day: d.getDate(),
      year: d.getFullYear(),
    };
  }

  /** Hace scroll al top de un elemento según selector */
  static scrollToTop(selector: string): void {
    if (typeof document !== "undefined") {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) {
        element.scrollTop = 0;
      }
    }
  }

  /** Genera un ID aleatorio de 5 caracteres */
  static genId(length = 5): string {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      possible.charAt(Math.floor(Math.random() * possible.length))
    ).join("");
  }
}
