import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { FavoritosService } from 'src/app/servicios/favoritos.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  email: any;
  favoritos: any;
  productos: any[] = [];
  usuario: any;
  objeto: any;

  constructor(private token: TokenService,
    private favoritosService: FavoritosService, private route: Router,
    private usuarioService: UsuarioService, private productoService: ProductoService) {
    this.email = this.token.getEmail();
    this.favoritos = [];
    this.objeto = this;
  }

  ngOnInit(): void {
    this.obtenerCliente();
    this.getProductos();
  }
  public obtenerCliente() {
    if (this.email !== "") {
      console.log(this.email);
      this.usuarioService.cedula(this.email).subscribe((valor: any) => {
        this.usuario = valor.respuesta;
        this.usuarioService.obtener(this.usuario).subscribe((valor: any) => {
          this.usuario = valor.respuesta;
        });
      });
    }
  }
  public getProductos() {
    if (this.token.getEmail() != "") {
      this.favoritosService.listarProductos().subscribe({
        next: data => {
          this.favoritos = data.respuesta;
          if (Array.isArray(this.favoritos) && this.favoritos.length > 0) {
            const codigoProductos = this.favoritos.map((favorito: any) => favorito.codigoProducto);
            const obtenerProductosPromises = codigoProductos.map((codigoUsuario: any) =>
              this.productoService.obtenerProducto(codigoUsuario).toPromise()
            );
            Promise.all(obtenerProductosPromises).then((productos: any) => {
              this.productos = productos;
              console.log(this.productos);
            });
          }
        }
      });
    } else {
      this.route.navigate(["/"]);
    }
  }
  public quitarProducto(codigo:number){
    console.log(codigo);
    console.log(this.usuario.codigo);
    this.favoritosService.eliminarProducto(this.favoritos.codigo).subscribe((valor: any) => {
      this.usuario = valor.respuesta;
      console.log(this.usuario);
    });
  }
}
