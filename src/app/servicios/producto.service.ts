import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/ProductoGetDTO';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { SharedService } from './shared.service';
import { ProductoDTO } from '../modelo/ProductoDTO';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  objeto: any;
  miProducto: ProductoDTO;

  private apiUrl = "http://localhost:8080/api/producto/listar";

  productos: ProductoGetDTO[];

  constructor(private router: Router, private http:HttpClient, private sharedService:SharedService) {
    this.productos = [];
    this.miProducto= new ProductoDTO();

    this.sharedService.objeto$.subscribe(objeto => {
      this.objeto = objeto;
     
      // Limpia el arreglo productos antes de agregar nuevos elementos
      this.productos.splice(0, this.productos.length);
       for (let i = 0; i < this.objeto.alerta.mensaje.length; i++) {
        this.miProducto = this.objeto.alerta.mensaje[i];
         this.productos.push(new ProductoGetDTO(this.objeto.alerta.mensaje[i].codigo, this.miProducto.nombre, this.miProducto.descripcion, this.miProducto.precio, this.miProducto.unidades, this.miProducto.imagenes, this.miProducto.categorias))
          }

    });
    
  }

  
  
  public listar(): ProductoGetDTO[] {
    return this.productos;
  }

  public obtener(codigo: number): ProductoGetDTO | undefined {
    return this.productos.find(p => p.codigo == codigo);
  }

  getProductos(): Observable<MensajeDTO> {
   // console.log("entre aqui",this.http.get<MensajeDTO>(this.apiUrl) );
    return this.http.get<MensajeDTO>(this.apiUrl);
  }
  
}
