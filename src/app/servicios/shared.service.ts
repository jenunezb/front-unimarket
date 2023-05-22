import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuarioDTO } from '../modelo/usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  usuario: UsuarioDTO | null = null;
  usuarioSubject: BehaviorSubject<UsuarioDTO | null> = new BehaviorSubject<UsuarioDTO | null>(null);


  private variableSubject = new BehaviorSubject<string>('');
  public variable$ = this.variableSubject.asObservable();

  private _nombreBoton: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public nombreBoton$ = this._nombreBoton.asObservable();

  constructor() { }

  public actualizarVariable(nuevoValor: string) {
    this.variableSubject.next(nuevoValor);
  }
  public cambiarNombreBoton(nuevoNombre: string) {
    this._nombreBoton.next(nuevoNombre);
  }

  setUsuario(usuario: UsuarioDTO) {
    this.usuario = usuario;
    this.usuarioSubject.next(usuario);
  }

  getUsuario(): UsuarioDTO | null {
    return this.usuario;
  }
}
