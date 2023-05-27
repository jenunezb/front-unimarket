import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-detalle-p',
  templateUrl: './detalle-p.component.html',
  styleUrls: ['./detalle-p.component.css']
})
export class DetallePComponent {
  
alerta!:Alerta;
codigoProducto:any;

  constructor(private productoServicio: ProductoService){
    this.obtenerProducto();
  }

  public obtenerProducto(){
    this.productoServicio.obtenerProducto(this.codigoProducto).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success");
        console.log(data.respuesta);
        },
        error: error => {
          this.alerta = new Alerta(error.error.respuesta, "danger");
        }
    });
  }

}
