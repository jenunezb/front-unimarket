import { Component } from '@angular/core';
import { UsuarioDTO } from 'src/app/modelo/usuario-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  usuario: UsuarioDTO;

  constructor() {
    this.usuario = new UsuarioDTO();
  }

  iniciarSesion(): void {
    // Aquí puedes implementar la lógica para validar el usuario y contraseña
    // y realizar el inicio de sesión en tu aplicación
    console.log(`Iniciando sesión con usuario: ${this.usuario} y contraseña: ${this.usuario.password}`);
  }
}
