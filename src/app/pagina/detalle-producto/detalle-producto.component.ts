import { Component } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})

export class DetalleProductoComponent {
  
  carritoService:CarritoService;
  codigoProducto: any;

  constructor(){
    this.carritoService = new CarritoService();
  }

  public agregarCarrito(){
    this.carritoService.agregar(this.codigoProducto);
    }
}
