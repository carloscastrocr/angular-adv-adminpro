import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
   public intervalSubs!: Subscription;
  constructor() {
   /* this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
      valor => console.log('Subs', valor),
      error => console.warn('Error', error),
      () => console.info('Obs terminado')
    );*/

    this.intervalSubs = this.retornaIntevalo().subscribe(console.log)
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }

 // OnDestroy(): void {}

  retornaIntevalo():Observable<number>{
    return interval(500)
                      .pipe(
                       // take(10),
                        map(valor =>{
                          return valor+1
                        }),
                        filter(valor=>(valor % 2 ===0) ? true: false),
                      );
  }

  retornaObservable():Observable<number> {
    let i = -1
    return new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
         // i = 0
          observer.error('i llego a valor 2')
        }
      }, 1000)
    });
  }
}
