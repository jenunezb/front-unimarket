import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductoGetDTO } from 'src/app/modelo/ProductoGetDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { FavoritoDTO } from 'src/app/modelo/favoritoDTO';
import { FavoritosService } from 'src/app/servicios/favoritos.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SharedService } from 'src/app/servicios/shared.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-listar-todos-productos',
  templateUrl: './listar-todos-productos.component.html',
  styleUrls: ['./listar-todos-productos.component.css']
})
export class ListarTodosProductosComponent implements OnInit {
  productos: ProductoGetDTO[];
  objeto: any;
  showMessage: boolean = false;
  codigoUsuario: number = 0;
  email: String = "";
  usuario: any;
  favoritoDTO: FavoritoDTO;

  constructor(private productoServicio: ProductoService,
    private sharedService: SharedService, private token: TokenService,
    private usuarioServicio: UsuarioService, private favoritoServicio: FavoritosService,
    private route: Router) {
    this.email = token.getEmail();
    this.productos = [];
    this.objeto = this;
    this.favoritoDTO = new FavoritoDTO;
  }

  ngOnInit(): void {
    this.getProductos();
    this.obtenerCliente();
  }

  public getProductos() {

    this.productoServicio.getProductos().subscribe({
      next: data => {
        this.objeto.alerta = new Alerta(data.respuesta, "success");
        this.sharedService.updateObjeto(this.objeto);
        this.productos = data.respuesta;
      },
      error: error => {
        this.objeto.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
  }
  public obtenerCliente() {
    if (this.email !== "") {
      console.log(this.email);
      this.usuarioServicio.cedula(this.email).subscribe((valor: any) => {
        this.codigoUsuario = valor.respuesta;
        this.usuarioServicio.obtener(this.codigoUsuario).subscribe((valor: any) => {
          this.usuario = valor.respuesta;
        });
      });
    }
  }
  guardarCodigoProducto(codigo: number) {
    this.sharedService.codigoProducto = codigo;
    console.log(codigo);
  }

  agregarFavoritos(item: any) {
    if (this.email !== "") {

      this.favoritoDTO.codigoUsuario = this.usuario.codigo;
      console.log(this.favoritoDTO.codigoUsuario)
      this.favoritoDTO.codigoProducto = item;

      this.favoritoServicio.agregarFavoritos(this.favoritoDTO).subscribe((valor: any) => {
        this.usuario = valor.respuesta;
      });

      localStorage.setItem('favoritos', JSON.stringify(item));
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 3000); // Oculta el mensaje después de 3 segundos
    } else {
      this.route.navigate(["/login"]);
    }
  }

}
