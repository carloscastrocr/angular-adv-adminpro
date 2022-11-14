import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //this.getUsuarios();
    this.getUsuarios().then(usuarios =>{
      console.log(usuarios); 
    })
   /* const promesa =new Promise(( resolve, reject )=>{
        if(false){
          resolve('Hola Mundo');
        }else{
           reject('algo salio mal')
        }
          
    });

    promesa.then((mensaje)=>{
       console.log('Temino', mensaje);
    }).catch((error)=>{
       console.log(error);
    })

    console.log('Fin del Init');*/
  }

  getUsuarios(){
   /* fetch('https://reqres.in/api/users').then((data)=>{
     // console.log(data)
     data.json().then(body=>console.log(body));
    })*/

    const promesa = new Promise(resolve =>{
      fetch('https://reqres.in/api/users')
      .then(data=>data.json())
      .then(body => resolve(body.data))
    });

   return promesa;
  }
}
