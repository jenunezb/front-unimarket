import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoGetDTO } from 'src/app/modelo/ProductoGetDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SharedService } from 'src/app/servicios/shared.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  numero: number = 0;
  alerta!: Alerta;
  codigo: any;
  producto: any = {};
  route: any;
  productos: ProductoGetDTO[];
  usuario: any;
  email:String="";

  constructor(private productoServicio: ProductoService, private router: Router, private sharedData: SharedService,
    private token: TokenService, private usuarioServicio: UsuarioService) {
    this.producto = this.producto;
    this.productos = [];
    this.email=token.getEmail();
  }
  ngOnInit(): void {
    const url: string = window.location.href;
    const segments: string[] = url.split('/');

    const index: number = segments.indexOf('compra');
    if (index !== -1 && segments.length > index + 1) {
      this.numero = parseInt(segments[index + 1]);
    } else {
      console.log('No se encontró el número en la URL.');
    }
    this.obtenerProducto();
    this.obtenerCliente();
  }

  public obtenerProducto() {
    this.productoServicio.obtenerProducto(this.numero).subscribe({
      next: data => {
        this.alerta = new Alerta(data.respuesta, "success");
        this.producto = data.respuesta;
      },
      error: error => {
        this.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  }

  public obtenerCliente() {
  this.usuarioServicio.cedula(this.email).subscribe((valor: any) => {
    this.codigo = valor.respuesta;
this.usuarioServicio.obtener(this.codigo).subscribe((valor:any)=>{
    this.usuario = valor.respuesta;
    console.log(this.usuario)
});
  });
  }

}