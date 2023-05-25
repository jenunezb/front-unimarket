import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SharedService } from './servicios/shared.service';
import { TokenService } from './servicios/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  
  title = 'Unimarket';
  isLogged = false;
  email:string = "";
  mostrarProductos: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sharedService: SharedService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if(this.isLogged){
    this.email = this.tokenService.getEmail();
    }
    }

  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(['/busqueda', valor]);
    }
  }
  
  public logout(){
    this.tokenService.logout();
    }

}
