import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieDetailResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  movie: MovieDetailResponse;
  cast: Cast[] = [];

  constructor(private aR:ActivatedRoute,
              private _ps: PeliculasService,
              private location: Location,
              private route:Router) { }

  ngOnInit(): void {
    const {id}  = this.aR.snapshot.params;

    combineLatest([
      this._ps.getPeliculaDetalle(id),
      this._ps.getCast(id)
    ]).subscribe(([movie, cast]) => {     

      if (!movie) {
        this.route.navigateByUrl('/home');
        return;
      }
      this.movie = movie;
      this.cast = cast.filter(actor => actor.profile_path != null);
     })
    
  }

  onRegresar(){
    this.location.back();
  }

}
