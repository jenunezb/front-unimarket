import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { SharedService } from './shared.service';
import { UsuarioDTO } from '../modelo/usuario-dto';

const TOKEN_KEY = "AuthToken";
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  usuario: UsuarioDTO | null = null;


  constructor(private router: Router,private sharedService: SharedService) {}



  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public login(token: string) {
    this.setToken(token);
<<<<<<< HEAD
    const tokenValue = this.getToken();

    if(tokenValue!== null ){
      this.actualizarVariable(tokenValue);
      this.usuario = this.sharedService.getUsuario();
      const emailValue = this.usuario?.email;
      console.log(emailValue);

      if(emailValue !== undefined){
        sessionStorage.setItem('email', emailValue);
        this.sharedService.cambiarNombreBoton(emailValue);
      }

      this.router.navigate(["/"]);
    }
=======
    this.router.navigate(["/registro"]);
>>>>>>> 113c92ef2d902aebbeab0563a3fc115372a1beb1
  }

  public logout() {
    window.sessionStorage.clear();
    const tokenValue = this.getToken();

    if (tokenValue !== null) {
      this.actualizarVariable(tokenValue);
    }

    this.router.navigateByUrl('/');
  }

  private decodePayload(token: string): any {
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
    }


    public actualizarVariable(nuevoValor: string) {
      this.sharedService.actualizarVariable(nuevoValor);
    }


}
