import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { FavoritoDTO } from '../modelo/favoritoDTO';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private catURL = "http://localhost:8080/api/favoritos";

  constructor(private http: HttpClient) { }
    public agregarFavoritos(favoritos:FavoritoDTO):Observable<MensajeDTO>{
      // const favoritos = {
      //   codigoProducto: codigoProducto,
      //   codigoUsuario: codigoUsuario
      // };
      return this.http.post<MensajeDTO>(`${this.catURL}/crear`,favoritos);
    }
  }