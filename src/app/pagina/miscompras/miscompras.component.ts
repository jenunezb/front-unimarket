import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TokenService } from 'src/app/servicios/token.service';
import { CompraService } from 'src/app/servicios/compra.service';


@Component({
  selector: 'app-miscompras',
  templateUrl: './miscompras.component.html',
  styleUrls: ['./miscompras.component.css']
})
export class MiscomprasComponent {

  usuario:any;
  email:any;

  constructor(private token: TokenService, private usuarioService: UsuarioService, private compraService: CompraService){
    this.email=this.token.getEmail();
  }

ngOnInit(): void {
  this.obtenerCliente();

}
public obtenerCliente() {
  if (this.email !== "") {
    console.log(this.email);
    this.usuarioService.cedula(this.email).subscribe((valor: any) => {
      this.usuario = valor.respuesta;
      this.getProductos();
      this.usuarioService.obtener(this.usuario).subscribe((valor: any) => {
        this.usuario = valor.respuesta;
      });
    });
  }
}

public getProductos(){

  if( this.token.getEmail()!=""){

    this.compraService.obtenerlistaCompra(this.usuario).subscribe({
      next: data => {

       console.log(this.usuario, "usuario");
       console.log(data.respuesta);

        }
    });
  }else{
    //this.route.navigate(["/"]);
  }
}
}
