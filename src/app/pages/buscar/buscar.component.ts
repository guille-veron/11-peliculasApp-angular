import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public movies: Movie[] = [];
  textoBuscar :string = '';
  constructor(private _ar: ActivatedRoute,
              private _ps : PeliculasService) { }

  ngOnInit(): void {
    this._ar.params.subscribe(params => {
      this.textoBuscar = params['texto'];
      this._ps.buscarPeliculas(params['texto'])
        .subscribe(movies => {
         this.movies = movies;
        })      
    })
  }

}
