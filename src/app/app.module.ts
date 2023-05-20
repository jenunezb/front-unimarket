import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { DetalleProductoComponent } from './pagina/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';
@NgModule({
declarations: [
AppComponent,
InicioComponent,
LoginComponent,
RegistroComponent,
CrearProductoComponent,
BusquedaComponent,
GestionProductosComponent,
DetalleProductoComponent,
CarritoComponent
],
imports: [
HttpClientModule,
BrowserModule,
AppRoutingModule,
FormsModule
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
