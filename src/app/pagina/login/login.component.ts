import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  alerta!: Alerta;
  usuario: UsuarioDTO;

  constructor(private authService: AuthService, private tokenService: TokenService) {
    this.usuario = new UsuarioDTO();
  }

  public login(){
    const objeto = this;
    this.authService.login(this.usuario).subscribe({
    next: data => {
    objeto.tokenService.login(data.respuesta.token);
    },
    error: error => {
    objeto.alerta = new Alerta(error.error.respuesta, "danger");
    }
    });
  }    
}
