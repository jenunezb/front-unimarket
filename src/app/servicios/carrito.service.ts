import { Injectable } from '@angular/core'; 
@Injectable({ 
providedIn: 'root' 
}) 
export class CarritoService { 
productos: number[]; 

constructor() { 
this.productos = []; 
} 
public agregar(codigo: number){ 
  //validar que el codigo no esté repetido
this.productos.push(codigo); 
} 
public quitar(codigo: number){ 
let indice = this.productos.indexOf(codigo); 
this.productos.splice(indice, 1); 
} 

public listar(): number[]{ 
return this.productos; 
} 

}
