import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

 
  @HostListener('window:scroll',['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if (pos > max) {
      
      if(this._ps.cargando){ return;}

      this._ps.getCartelera()
        .subscribe(movies => {      
          this.movies.push(... movies);
        })
    }
    
  }

  constructor(private _ps: PeliculasService){}

  
  ngOnDestroy(): void {
    this._ps.resetCarteleraPage();
  }
  

  ngOnInit(): void {
    this._ps.getCartelera()
    .subscribe(movies => {      
      this.movies = movies;
      this.moviesSlideShow = movies;
    });
  }

}
