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
export class FavoritosComponent implements OnInit{
  email:any;
  favoritos:any;
  producto:any;
  usuario:any;
  objeto: any;
  
  constructor(private token: TokenService,
    private favoritosService: FavoritosService, private route: Router,
    private usuarioService: UsuarioService, private productoService: ProductoService){
    this.email=this.token.getEmail();
    this.favoritos=[];
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
  public getProductos(){

    if( this.token.getEmail()!=""){

      this.favoritosService.listarProductos().subscribe({
        next: data => {
          this.favoritos = data.respuesta;
          if (Array.isArray(this.favoritos) && this.favoritos.length > 0) {
            const { id, codigoUsuario } = this.favoritos[0];
            console.log(codigoUsuario);
            console.log(this.usuario);
            this.productoService.getProductos().subscribe({
              next: data => {
                this.objeto.alerta = new Alerta(data.respuesta, "success");
                this.producto = data.respuesta;
                console.log(this.producto)
              },
              error: error => {
                this.objeto.alerta = new Alerta(error.error.respuesta, "danger");
              }
            });
          }
          }
      });
    }else{
      this.route.navigate(["/"]);
    }
  }
}
