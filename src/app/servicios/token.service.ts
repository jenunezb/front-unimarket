import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { SharedService } from './shared.service';
import { UsuarioDTO } from '../modelo/usuario-dto';
import { Observable } from 'rxjs';

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
    const tokenValue = this.getToken();

    if(tokenValue!== null ){
      this.actualizarVariable(tokenValue);
      this.usuario = this.sharedService.getUsuario();
      const emailValue = this.usuario?.email;
      console.log(emailValue);

      if(emailValue !== undefined){
        sessionStorage.setItem('email', emailValue);
        this.sharedService.cambiarNombreBoton(emailValue);
        window.location.href="http://localhost:4200/";
      }

    }
    }

  public getEmail():string{
    const token = this.getToken();
    if(token){
    const values = this.decodePayload(token);
    return values.sub;
    }
    return "";
    }

    public logout() {
      this.sharedService.cambiarNombreBoton("Login");
    sessionStorage.clear();
    window.location.href="http://localhost:4200/";
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
