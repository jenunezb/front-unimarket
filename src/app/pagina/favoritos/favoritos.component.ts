import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private token: TokenService,
    private favoritosService: FavoritosService, private route: Router,
    private usuarioService: UsuarioService, private productoService: ProductoService){
    this.email=this.token.getEmail();
    this.favoritos=[];
  }

  ngOnInit(): void {
    this.getProductos();
  }
  
  public getProductos(){
    if( this.token.getEmail()!=""){
      this.favoritosService.listarProductos().subscribe({
        next: data => {
          this.favoritos = data.respuesta;
          if (Array.isArray(this.favoritos) && this.favoritos.length > 0) {
            const { codigoProducto, codigoUsuario } = this.favoritos[0];
            console.log(codigoProducto); 
            console.log(codigoUsuario);
            this.usuarioService.obtener(codigoUsuario).subscribe({
              next: data => {
                this.favoritos = data.respuesta;
                console.log(this.favoritos);
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
