import { Component } from '@angular/core';
import { ProductoDTO } from 'src/app/modelo/ProductoDTO';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  archivos!: FileList;
  categorias: string[];
  producto: ProductoDTO;

  constructor() {
    this.producto = new ProductoDTO();
    this.categorias = [];
  }

  ngOnInit(): void {
    this.categorias.push('Tecnología');
    this.categorias.push('Hogar');
    this.categorias.push('Deportes');
    this.categorias.push('Moda');
    this.categorias.push('Mascotas');
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
    }
  }
  public crearProducto() {
    if (this.archivos != null && this.archivos.length > 0) {
      console.log(this.producto);
    } else {
      console.log('Debe seleccionar al menos una imagen');
    }
  }
}

