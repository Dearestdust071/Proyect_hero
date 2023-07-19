import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionService } from '../conexion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {


  constructor(private router: Router, private fb: FormBuilder, private conexion: ConexionService, private route: ActivatedRoute) {
    // this.actualizar();
  }
  id: number = 0;
  heroe: any = {};

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    this.getPersonaje();


  }

  get f() { return this.Formulario.controls }

  Formulario: FormGroup = this.fb.group({
    url: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required]],
    compania: ['', [Validators.required]]

  });



  // getPersonaje() {
  //   this.conexion.getbyID('Heroes', 'GetId', this.id).subscribe((dato: any) => {
  //     this.heroe = dato;

  //   })
  getPersonaje() {
    this.conexion.getbyID('Heroes', 'GetId', this.id).subscribe((dato: any) => {
      this.heroe = dato;

      // Precargar los valores del objeto JSON en el formulario
      this.Formulario.patchValue({
        url: this.heroe.url,
        genero: this.heroe.genero,
        nombre: this.heroe.nombre,
        descripcion: this.heroe.description,
        compania: this.heroe.compania
      });
    })





  }

  borrar(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success me-3',
        cancelButton: 'btn btn-danger me-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Seguro de borrar?',
      text: "No se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',

      // reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Borrado!',
          'Su heroe se ha eliminado.',
          'success'
        )
        this.conexion.Delete('Heroes', 'Delete',this.id).subscribe((dato:any)=>{
          console.log(dato);
        });
        this.router.navigate(['list']);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'A su heroe le sudo :)',
          'error'
        )
      }
    })


  }


  actualizar() {
    if (this.Formulario.invalid) {
      console.log('Adios');
      this.Formulario.markAsTouched;
      return;
    }
    this.Formulario.value.id = this.id;
    console.log(this.Formulario.value);
    this.conexion.Update('Heroes', 'Update', this.Formulario.value).subscribe((dato:any) => {
      console.log(dato);
      this.router.navigate(['list'])
    });
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

    // console.log(this.Formulario.value.id = 1);
    // console.log(this.Formulario.value);


  }



}
