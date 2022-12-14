import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import {catchError, map, tap} from 'rxjs/operators'  //operador que dispara un efecto secundario
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario | undefined;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
     return this.usuario?.uid || ""
  }

  logout(){
    localStorage.removeItem('token');

    google.accounts.id.revoke('carloscastroramos.cr@gmail.com',()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login')
      })
    })
    
  }

  validatToken(): Observable<boolean>{
    //const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers: {
        'x-token':this.token
      }
    }).pipe(
      map((resp: any)=>{
        console.log(resp);
        const {email, google, img='', nombre, role, uid}= resp.usuario;
        this.usuario = new Usuario(nombre, email, '', google, img, role, uid);
 
        localStorage.setItem('token', resp.token)
        return true
      }),
     
      catchError(error=>of(false))
    )
  }

  crearUsuario(formData: RegisterForm){
     
    //como es un observable tengo que subscribirme a el
    //lo debuelbo con el return para subscribirme donde lo usare ".subcribe"
    return this.http.post(`${base_url}/usuarios`, formData)
                    .pipe(
                        tap( (resp:any) => {
                             localStorage.setItem('token', resp.token)
                        } )
                    );
  }

  actualizarPerfil(data: {email: string, nombre:string, role:string | undefined}){

    data = {
      ...data,
      role: this.usuario?.role
    }

   return this.http.put(`${base_url}/usuarios/${this.uid}`, data,{
      headers: {
        'x-token':this.token
      }
    });

  }

  login(formData: any){
     
    //como es un observable tengo que subscribirme a el
    //lo debuelbo con el return para subscribirme donde lo usare ".subcribe"
    return this.http.post(`${base_url}/login`, formData)
                    .pipe(
                      tap( (resp:any) => {
                        localStorage.setItem('token', resp.token)
                      } )
                    );

  }

  loginGoogle(token: string){

    return this.http.post(`${base_url}/login/google`, {token})
                    .pipe(
                      tap( (resp:any) => {
                        //console.log(resp);
                        localStorage.setItem('token', resp.token)
                      } )
                    );
  }
}
