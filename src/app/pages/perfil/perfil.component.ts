import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup ;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp:any=null;

  constructor(
    private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
    ) {
       this.usuario = usuarioService.usuario!;
   }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  cambiarImagen( event: any){
    const file = event.target.files[0];
    this.imagenSubir = file;

    if(!file){return;}

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result
      
    }
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, "usuarios", this.usuario.uid!)
    .then(img=>{
      this.usuario.img = img;
      Swal.fire('Guardado', 'Imagen de perfil actualizada', 'success')
    }).catch(err=> Swal.fire('Error', err.error.msg, 'error'))
  }

  actualizarPerfil(){
    console.log(this.perfilForm?.value)
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
        .subscribe((resp:any) =>{
          console.log(resp);
          const {nombre, email} = this.perfilForm.value;
          this.usuario.nombre=nombre;
          this.usuario.email=email;

          Swal.fire('Guardado', 'Cambios guardos correctamente', 'success')
        },(err)=>{
          Swal.fire('Error','no se pudo subir la imagen', 'error');
         
        })
  }

}
