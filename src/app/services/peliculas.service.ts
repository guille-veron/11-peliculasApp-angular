import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { Cast, CreditResponse } from '../interfaces/credits-response';
import { MovieDetailResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl:string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando:boolean = false;

  constructor(private http: HttpClient) { }

  get params(){
    return {
      api_key:'b61ecb76fef5dd76f11065df3985e9f3',
      language:'es-ES',
      adult: true,
      page: this.carteleraPage
    }
  }

  getCartelera():Observable<Movie[]>{
    if (this.cargando) {
      return of([]);
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{
      params: this.params
    }).pipe(
      map(resp => resp.results),
      tap(() => {
        this.carteleraPage ++;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(texto:string):Observable<Movie[]>{
    const params = {... this.params, page : 1, query : texto};
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
      params
    }).pipe(map(resp => resp.results))
  }

  resetCarteleraPage(){
   this.carteleraPage = 1; 
  }

  getPeliculaDetalle(id: string){
    return this.http.get<MovieDetailResponse>(`${this.baseUrl}/movie/${ id }`,{
      params: this.params
    }).pipe(
      catchError(err => of(null))
    )
  }

  getCast(id: string):Observable<Cast[]>{
    return this.http.get<CreditResponse>(`${this.baseUrl}/movie/${ id }/credits`,{
      params: this.params
    }).pipe(      
      map(resp => resp.cast),
      catchError(err => of([]))
    )
  }
}
