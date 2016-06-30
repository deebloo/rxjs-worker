import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { createWorker } from '../utils'

export class MapWorkerObservable extends Observable<any> {
  lift(operator) {
    const observable = new MapWorkerObservable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  mapWorker(cb: Function) {
    const subject: Subject<any> = new Subject();
    const worker = createWorker(cb);
    let data;

    worker.onmessage = e => {
      if(e.data && data) {
        subject.next(data)
      } else {
        subject.next(null);
      }
    }

    this.subscribe(value => {
      data = value;

      worker.postMessage(data);
    });

    return subject;
  }
}