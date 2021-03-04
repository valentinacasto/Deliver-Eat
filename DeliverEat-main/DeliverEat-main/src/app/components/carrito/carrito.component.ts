import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  mostrar="listado";

  constructor() { }

  ngOnInit() {
    
 
  }
  Quitar(){
   this.mostrar="borrar";   
  }
  Desbloquear(){
    this.mostrar="listado";  
  }

}