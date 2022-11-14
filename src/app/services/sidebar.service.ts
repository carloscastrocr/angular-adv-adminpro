import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[] = [
      {
        titulo: 'Dashboard...',
        icono: 'mdi mdi-gauge',
        submenu:[
          {titulo:'Main', path:'/'},
          {titulo:'Gráficas', path:'grafica1'},
          {titulo:'Rxjs', path:'rxjs'},
          {titulo:'ProgressBar', path:'/dashboard/progress'},
          {titulo:'Promesas', path: 'promesas'}
        ]
      }
  ]
  constructor() { }
}
