import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
 //TODO LO COMENTADO SE LLEVO AL SETTINGSSERVICES
  // public linkTheme = document.querySelector('#theme');
 // public links!: NodeListOf<Element>;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    //PARA EVITAR CARGAR EL DOM CADA VEZ QUE UTILIZAMOS EL checkCurrentTheme() 
    //PODRIAMOS ENVIARLE COMO REFERENCIA LOS ENLACES QUE NECESITAMOS TRABAJAR
    this.settingsService.checkCurrentTheme()
    //this.links = document.querySelectorAll('.selector')
    //this.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
    /* const url = `./assets/css/colors/${theme}.css`;
     this.linkTheme?.setAttribute('href',url);
     localStorage.setItem('theme', url);*/
   // this.checkCurrentTheme(); lo quitamos porque lo dispararemos en el settingsService.changeTheme
  }

  /*checkCurrentTheme() {
    this.links.forEach(elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme')
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    })
  }*/

}
