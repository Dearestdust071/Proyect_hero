import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionService } from '../conexion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {


  constructor(private router:Router, private fb:FormBuilder, private conexion:ConexionService){

  }

  get f(){return this.Formulario.controls}

  Formulario: FormGroup = this.fb.group({
    url : ['', [Validators.required]],
    genero: ['', [Validators.required]],
    nombre : ['', [Validators.required, Validators.minLength(3)]],
    descripcion : ['', [Validators.required]],
    compania : ['', [Validators.required]]

  });

  crear(){
    if(this.Formulario.invalid){
      this.Formulario.markAllAsTouched();
      return
    }
    console.log('PRUEBAEXITOSA');
    console.log(this.Formulario.value);
    this.conexion.Post('Heroes','Insert', this.Formulario.value).subscribe((dato:any)=>{
      console.log(dato);
    })
    Swal.fire({
      title: 'Guardado exitosamente!',
      icon: 'success',
      width: 600,
      padding: '3em',
      color: '#716add',
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `,

    })
    this.router.navigate(['list']);

  }

}
