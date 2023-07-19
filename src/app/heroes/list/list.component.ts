import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../conexion.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  ejemplos: any = [];


  constructor(private router: Router, private conexion: ConexionService) {
    this.getAll();
    // this.imprimir();
    this.printByID(1);
  }
  enviarCrear() {
    this.router.navigate(['create']);
  }


  getAll() {
    this.conexion.Get('Heroes', 'GetAll').subscribe((dato: object) => {
      this.ejemplos = dato;
      console.log(this.ejemplos);

    });
  }

  imprimir(id:number) {
    this.printByID(id)
    console.log(id);
    this.router.navigate(['update',id])

  }

  printByID(id: number) {
    this.conexion.getbyID('heroes', 'GetId', id).subscribe((dato:object) => {
      console.log(dato);

    })


  }

    //   ejemplos = [
    //     {
    //       nombre:'punisher',
    //       compania: 'marvel',
    //       descripcion:'Punisher, también conocido como Frank Castle, es un vigilante implacable y sin remordimientos. Motivado por la venganza después de la muerte de su familia, se dedica a castigar a los criminales sin piedad. Es hábil en combate cuerpo a cuerpo y armado, con un arsenal letal a su disposición. Su enfoque violento lo distingue como uno de los antihéroes más notorios.',
    //       genero: 'hombre',
    //       imagenUrl :'https://cdn.alfabetajuega.com/alfabetajuega/abj_public_files/Alfabetajuega-Antiheroes-Punisher.jpg',
    //       timestamp: '11-July-2023 05:29 PM'
    //     },
    //     {
    //       nombre:'silk',
    //       compania: 'marvel',
    //       descripcion:'Silk, también conocida como Cindy Moon, es una superheroína en el universo de Spider-Man. Dotada con habilidades arácnidas similares a las de Peter Parker, posee una increíble agilidad y la capacidad de tejer telarañas orgánicas. Su historia revela un pasado misterioso y una valiente lucha contra el crimen.',
    //       genero: 'mujer',
    //       imagenUrl :'https://www.enter.co/wp-content/uploads/2022/11/pwCZBRuWMc7iwrTLqUoQ6E-1200-80-768x432.jpg',
    //       timestamp: '11-July-2023 05:29 PM'
    //     },
    // ]





  }
