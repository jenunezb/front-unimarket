import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SharedService } from './servicios/shared.service';
import { TokenService } from './servicios/token.service';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'unimarket';
  mostrarComponentes: boolean = false;
  public variable: string='';
  nombreBoton: string = '';
  mostrarBoton: boolean = true;
  mostrarLabel: boolean =false;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sharedService: SharedService, private tokenService: TokenService) {}

  ngOnInit() {
    this.sharedService.variable$.pipe(
      filter(valor => valor !== null),
      map(() => sessionStorage.getItem('AuthToken'))
    ).subscribe(tokenValue => {
      if (tokenValue) {
        this.mostrarComponentes = true;
        this.mostrarBoton = false;
        this.mostrarLabel=true;
      }
    });

    this.sharedService.nombreBoton$.subscribe(valor => {
      const nombreBoton = sessionStorage.getItem('email');
      if (nombreBoton) {
        this.nombreBoton = nombreBoton;
      }
    });
  }



  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(['/busqueda', valor]);
    }
  }

  public logout() {
    this.tokenService.logout();
    this.mostrarComponentes = false;
    this.mostrarBoton = true;
    this.mostrarLabel = false;
  }

}
