import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appThousandsSeparator]'
})
export class ThousandsSeparatorDirective {

  private decimalSeparator = ',';
  private thousandsSeparator = '.';

  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;

    // quitar todo lo que no sea número
    let numericValue = initialValue.replace(/\D/g, '');

    if (numericValue) {
      // formatear con separador de miles
      const formatted = new Intl.NumberFormat('es-CO').format(Number(numericValue));
      this.el.nativeElement.value = formatted;

      // actualizar el FormControl con valor numérico crudo
      this.control.control?.setValue(Number(numericValue), { emitEvent: false });
    } else {
      this.control.control?.setValue(null, { emitEvent: false });
    }
  }
}
