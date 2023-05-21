import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  alerta!: Alerta;
  usuario: UsuarioDTO;

  constructor(private authService: AuthService) {
    this.usuario = new UsuarioDTO();
  }

  iniciarSesion(): void {
    const objeto = this;
    this.authService.login(this.usuario).subscribe({
      next: data => {
        objeto.alerta = new Alerta(data.respuesta, "success");
      },
      error: error => {
        objeto.alerta = new Alerta(error.error.respuesta, "danger");
      }
    });
    console.log(`Iniciando sesión con usuario: ${this.usuario} y contraseña: ${this.usuario.password}`);
  }
}
