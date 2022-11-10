import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
 // @Input() doughnutChartLabels: string[] = ['', '', ''];
 // @Input() data1= [100, 100, 100];  
  @Input() title: string = "Sin titulo";
 // public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
 @Input() doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Sales1', 'Sales2', 'Sales3'],
    datasets: [
      { data: [100, 100, 100] },
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
