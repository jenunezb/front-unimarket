import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SharedService } from 'src/app/servicios/shared.service';

@Component({
  selector: 'app-detalle-p',
  templateUrl: './detalle-p.component.html',
  styleUrls: ['./detalle-p.component.css']
})

export class DetallePComponent implements OnInit{
  
alerta!:Alerta;
codigo:any;
producto: any={};
route:any;

  constructor(private productoServicio: ProductoService,private router: Router, private sharedData: SharedService){
    this.producto=this.producto;
    
  }

  ngOnInit(): void {
    this.codigo = this.sharedData.codigoProducto;
    this.obtenerProducto();
  }

  public obtenerProducto(){
    this.productoServicio.obtenerProducto(this.codigo).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success");
        this.producto=data.respuesta;
        console.log(data.respuesta);
        },
        error: error => {
          this.alerta = new Alerta(error.error.respuesta, "danger");
        }
    });
  }
}
