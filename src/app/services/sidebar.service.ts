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
          {titulo:'ProgressBar', path:'/dashboard/progress'},
          {titulo:'Gráficas', path:'grafica1'}
        ]
      }
  ]
  constructor() { }
}
