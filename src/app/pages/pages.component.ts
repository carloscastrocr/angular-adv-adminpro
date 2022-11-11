import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

//@ts-ignore.
declare function customInitFunctions():void;
//declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  // llevamos la logica de carga del Theme al SettingsService
  constructor(private settingsService:SettingsService) {  }

  ngOnInit(): void {
    customInitFunctions();
  }

}




