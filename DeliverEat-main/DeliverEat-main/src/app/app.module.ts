import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';  
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { MenuComponent } from './components/menu/menu.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { MockCiudadesService } from './services/mock-ciudades.service';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, BrowserAnimationsModule, ReactiveFormsModule,
        RouterModule.forRoot([
      { path: '', redirectTo: '/carrito', pathMatch: 'full' },
      { path: 'carrito', component: CarritoComponent },
      { path: 'pedido', component: PedidoComponent }
    ]),],
  declarations: [ AppComponent, HelloComponent, CarritoComponent, MenuComponent, PedidoComponent ],
  bootstrap:    [ AppComponent ],
  providers: [MockCiudadesService]
})
export class AppModule { }
