import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-detalle-p',
  templateUrl: './detalle-p.component.html',
  styleUrls: ['./detalle-p.component.css']
})

export class DetallePComponent implements OnInit{
  
alerta!:Alerta;
codigoProducto:any;
producto: any;
route:any;

  constructor(private productoServicio: ProductoService, route: ActivatedRoute){
    this.producto=this.producto;
    
  }

  ngOnInit(): void {
    // this.obtenerProducto()
  }

  public obtenerProducto(){
    this.productoServicio.obtenerProducto(this.codigoProducto).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success");
        this.producto=data;
        console.log(data.respuesta);
        },
        error: error => {
          this.alerta = new Alerta(error.error.respuesta, "danger");
        }
    });
  }

}
