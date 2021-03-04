import { Injectable } from '@angular/core';
import { of } from "rxjs";
import { Ciudades } from "../models/ciudad";

@Injectable({
  providedIn: 'root'
})
export class MockCiudadesService {

constructor() {}
  get() {
    return of(Ciudades);
  }
}