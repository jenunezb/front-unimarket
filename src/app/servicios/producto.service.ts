import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/ProductoGetDTO';
import { ProductoDTO } from '../modelo/ProductoDTO';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: ProductoGetDTO[];
  constructor(private router: Router) {
    this.productos = [];
    this.productos.push(new ProductoGetDTO(1, "Televisor LG 4K", "Descripcion 1", 3500000, 2, ["https://picsum.photos/450/225", "https://picsum.photos/450/225"], ["TECNOLOGIA"]));
    this.productos.push(new ProductoGetDTO(2, "Tenis Nike", "Descripcion 2", 650000, 4, ["https://picsum.photos/450/225"], ["ROPA", "DEPORTE"]));
    this.productos.push(new ProductoGetDTO(3, "Mesa de centro", "Descripcion 3", 2500000, 1, ["https://picsum.photos/450/225"], ["HOGAR"]));
    this.productos.push(new ProductoGetDTO(4, "Portátil Dell", "Descripcion 4", 5500000, 5, ["https://picsum.photos/450/225"], ["TECNOLOGIA"]));
    this.productos.push(new ProductoGetDTO(5, "Vestido de noche", "Descripcion 5", 850000, 3, ["https://picsum.photos/450/225"], ["ROPA"]));
    this.productos.push(new ProductoGetDTO(6, "Zapatos de cuero", "Descripcion 6", 1200000, 2, ["https://picsum.photos/450/225"], ["ROPA", "DEPORTE"]));
    this.productos.push(new ProductoGetDTO(7, "Aspiradora de mano", "Descripcion 7", 400000, 4, ["https://picsum.photos/450/225"], ["HOGAR"]));
    this.productos.push(new ProductoGetDTO(8, "Smartwatch Samsung", "Descripcion 8", 1800000, 3, ["https://picsum.photos/450/225"], ["TECNOLOGIA"]));

  }
  public listar(): ProductoGetDTO[] {
    return this.productos;
  }

  public obtener(codigo: number): ProductoGetDTO | undefined {
    return this.productos.find(p => p.codigo == codigo);
  }

}
