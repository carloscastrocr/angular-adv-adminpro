import { Component, OnInit,AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') ||'', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    remember: [false],
  });

  constructor(private router: Router, 
              private fb: FormBuilder, 
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
     this.googleInit();
  }

  googleInit(){
    
    google.accounts.id.initialize({
      client_id: '629520861027-6i49tjcfhts3d8q93qb1662k5g3nqa8t.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
   // console.log({esto:this})
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
        .subscribe(resp=>{
         // console.log({login: resp})
         
          this.router.navigateByUrl('/')
        })
  }

  login() {
    //     this.router.navigateByUrl('/')
    // Realizar el posteo
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value!)
        }else{
          localStorage.removeItem('email')
        }
        //navegar al Dashboard
        this.router.navigateByUrl('/')
      }, (err) => {
        //si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
