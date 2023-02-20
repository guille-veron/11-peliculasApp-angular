import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  buscarPeliculas(texto: string){
    texto = texto.trim();
    if(texto.length === 0) {return;}

    this.route.navigate(['/buscar',texto])    
  }

}
