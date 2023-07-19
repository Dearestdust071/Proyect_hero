import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  baseURL = 'http://localhost/serviciosphp/controller/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http: HttpClient) { }

  Get(Modelo: string, Accion: any) {
    return this.http.get(`${this.baseURL}${Modelo}.php?opcion=${Accion}`, this.httpOptions);
  }
  Post(Modelo: string, Accion: string, Datos: any) {
    console.log(this.http.post(`${this.baseURL}${Modelo}.php?opcion=${Accion}`, Datos, this.httpOptions));

    return this.http.post(`${this.baseURL}${Modelo}.php?opcion=${Accion}`, Datos, this.httpOptions);
  }
  getbyID(Modelo: string, Accion: string, id: number) {
    const ident = {
      "heroe_id":id
    }
      // console.log(`${this.baseURL}${Modelo}.php?opcion=${Accion}`, options);
      return this.http.post(`${this.baseURL}${Modelo}.php?opcion=${Accion}`, ident, this.httpOptions);
  }

  Update(Modelo: string, Accion: string, Datos: any) {
    console.log(this.http.post(`${this.baseURL}${Modelo}.php?opcion=${Accion}`, Datos, this.httpOptions));

    return this.http.post(`${this.baseURL}${Modelo}.php?opcion=${Accion}`, Datos, this.httpOptions);
  }

  Delete(Modelo:string, Accion:string, id?:number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{
        "id": id
      },
    };
    console.log(`${this.baseURL}${Modelo}.php?opcion=${Accion}`,options);

    return this.http.delete(`${this.baseURL}${Modelo}.php?opcion=${Accion}` , options);
  }



}
