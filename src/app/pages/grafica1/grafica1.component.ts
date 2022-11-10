import { Component, OnInit } from '@angular/core';
import { ChartData} from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {
    
  public labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  public data1= [350, 450, 100]
  
  public title1= "Ventas 2"

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: this.data1 },

    ]
  };


  constructor() { }

  ngOnInit(): void {
  }

}
