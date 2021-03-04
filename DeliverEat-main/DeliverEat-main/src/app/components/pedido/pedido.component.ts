import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Ciudad } from "../../models/ciudad";
import { FormControl } from '@angular/forms';

import { MockCiudadesService } from "../../services/mock-ciudades.service";

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  FormReg: FormGroup;
  FormPedido: FormGroup;
  FormEntrega: FormGroup;
  FormPago: FormGroup;
  FormPagoTarjeta: FormGroup;
  FormPagoEfectivo: FormGroup;
  

  title = 'appBootstrap';
  
  model;
  entrega = "ahora";
  elegido: string;
  CiudadElegida: string;
  MetodoPago: string;
  
  time = {hour: 14, minute: 30};

  Ciudades: Ciudad[] = [];

  AccionDatos="P";
  submitted = false;
  submittedEfectivo = false;
  submittedTarjeta = false;

  Ciudad = new FormControl('');
  Calle = new FormControl('');
  Numero = new FormControl('');
  Referencia = new FormControl('');
  Piso = new FormControl('');
  NroTarjeta = new FormControl('');
  Monto = new FormControl('');
  Entrega = new FormControl('');

  constructor(
    public formBuilder: FormBuilder,
    private ciudadService: MockCiudadesService,
  ) { 
   }

  ngOnInit() {
    this.FormPedido = this.formBuilder.group({
      Calle: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
      IdCiudad: ["", [Validators.required]],
      Numero: [null, [Validators.required,
       Validators.pattern("[0-9]{1,7}")]],
      Entrega: [null, [Validators.required]],
    });
    this.FormEntrega = this.formBuilder.group({
      Calendario: [null, [Validators.required]],
      Hora: [null, [Validators.required, Validators.min(0), Validators.max(23), Validators.pattern("[0-9]{2}")]],
      Minutos: [null, [Validators.required, Validators.pattern("[0-5][0-9]{1}")]],
    });
    this.FormPagoEfectivo = this.formBuilder.group({
      Monto: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
    });
    this.FormPagoTarjeta = this.formBuilder.group({
      NroTarjeta: [null, [Validators.required,
      Validators.min(4000000000000000), Validators.max(4999999999999999),
      Validators.pattern("[0-9]{16}")]],
      Titular:[
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(55),Validators.pattern('[a-zA-Z ]*')]
      ],
      CVC: [null, [Validators.required, Validators.pattern("[0-9]{3}")]],
      Vencimiento: [null, [Validators.required]], 
    });
    this.FormReg = this.formBuilder.group({
      Mes: [null, [Validators.required, Validators.pattern("[01-12]{2}")]],
    });


    this.GetCiudades();
  }

  GetCiudades() {
    this.ciudadService.get().subscribe((res: Ciudad[]) => {
      this.Ciudades = res;
    });
  }

  Tarjeta(){
    window.scroll(0, 0);
    this.submitted = true;
    if (this.FormPedido.invalid) {
      return;
    }
    if (this.elegido == "programar"){
      if (this.FormEntrega.invalid) {
        return;
      }
    }
    this.AccionDatos="T";
    this.MetodoPago = "Tarjeta";
  }

  Efectivo(){
    window.scroll(0, 0);
    this.submitted = true;
    if (this.FormPedido.invalid) {
      return;
    }
    if (this.elegido == "programar"){
      if (this.FormEntrega.invalid) {
        return;
      }
    }
    this.AccionDatos="E";
    this.MetodoPago = "Efectivo";
  }

  Volver(){
    window.scroll(0, 0);
    this.submitted = false;
    this.submittedTarjeta = false;
    this.submittedEfectivo = false;
    this.AccionDatos="P";
  }

  Programar(){
    this.entrega = "programar";
  }

  ConfirmarTarjeta(){
    window.scroll(0, 0);
    this.submittedTarjeta = true;
    if (this.FormPagoTarjeta.invalid) {
      return;
    }
    this.AccionDatos = "R";
    this.Resumen();
  }

  ConfirmarEfectivo(){
    window.scroll(0, 0);
    this.submittedEfectivo = true;
    if (this.FormPagoEfectivo.invalid) {
      return;
    }
    this.AccionDatos = "R";
    this.Resumen();
  }

  Ahora(){
    this.entrega = "ahora"
  }

  radioChangeHandler(event: any){
    this.elegido = event.target.value;
  }

  Resumen(){
    this.Calle.setValue(this.FormPedido.value.Calle);
    this.Numero.setValue(this.FormPedido.value.Numero);
    this.NroTarjeta.setValue(this.FormPagoTarjeta.value.NroTarjeta);
    this.Monto.setValue(this.FormPagoEfectivo.value.Monto);
    
  }

  ObtenerCiudad(event: any){
    this.CiudadElegida = event.target.value;
  }

  ConfirmarPedido(){
    this.AccionDatos = "L";
  }


  

}