import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductoDTO } from 'src/app/modelo/ProductoDTO';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  archivos!: FileList;
  categorias: string[];
  producto: ProductoDTO;
  private route:ActivatedRoute;
  esEdicion : boolean;
  codigoProducto:number;
  txtBoton : string = "Crear Producto";

  constructor(private imagenService: ImagenService, private categoriaService: CategoriaService,private productoService:ProductoService) {
    this.producto = new ProductoDTO();
    this.codigoProducto =0;
    this.categorias = [];
    
    this.route = new ActivatedRoute();
    this.esEdicion =false;
    
    this.route.params.subscribe(params => { 
      this.codigoProducto = params["codigo"]; 
      let objetoProducto = this.productoService.obtener(this.codigoProducto); 
      if(objetoProducto != null){ 
      this.producto = objetoProducto; 
      this.txtBoton = 'Editar Producto'; 
      } 
      });
    
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
    
    //cree el producto o lo edite según el caso (haga uso de la variable esEdicion para controlar qué función llamar).

    if (this.archivos != null && this.archivos.length > 0) {
      console.log(this.producto);
    } else {
      console.log('Debe seleccionar al menos una imagen');
    }
  }

  private cargarCategorias(){
    this.categoriaService.listar().subscribe({
    next: data => {
    this.categorias = data.respuesta;
    },
    error: error => {
    console.log(error.error);
    }
    });
  }
    
  public subirImagenes() {
    if (this.archivos != null && this.archivos.length > 0) {
    const objeto = this.producto;
    const formData = new FormData();
    formData.append('file', this.archivos[0]);
    this.imagenService.subir(formData).subscribe({
    next: data => {
    objeto.imagenes.push( data.respuesta.url );
    },
    error: error => {
    console.log(error.error);
    }
    });
    } else {
    console.log('Debe seleccionar al menos una imagen y subirla');
    }
    }
}


