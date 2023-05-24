import { Component, OnInit } from '@angular/core';
import { ProductoGetDTO } from 'src/app/modelo/ProductoGetDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SharedService } from 'src/app/servicios/shared.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  textoBtnEliminar: String = "";
  productos: ProductoGetDTO[];
  seleccionados: ProductoGetDTO[];
  alerta!: Alerta;
  objeto: any;

  
  constructor(private productoServicio: ProductoService, private sharedService:SharedService) {
    this.productos = [];
    this.seleccionados = [];
    this.objeto = this;
    this.sharedService.objeto = this.objeto;
  }

  ngOnInit(): void {
    this.productos = this.productoServicio.listar();
    this.getProductos();
  }

  public seleccionar(producto: ProductoGetDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(producto);
    } else {
      this.seleccionados = this.seleccionados.filter(i => i != producto);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }

  public borrarProductos(){ 
    this.seleccionados.forEach(e => { 
    this.productos = this.productos.filter(i => i != e); 
    }); 
    this.seleccionados = []; 
    this.actualizarMensaje(); 
    }

    public getProductos(){
      
      this.productoServicio.getProductos().subscribe({
        next: data => {
          this.objeto.alerta = new Alerta(data.respuesta, "success");
          this.sharedService.updateObjeto(this.objeto);
          this.productoServicio.listar();
          },
          error: error => {
            this.objeto.alerta = new Alerta(error.error.respuesta, "danger");
          }
      });
    }
}