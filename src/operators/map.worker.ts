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

    worker.onmessage = e => subject.next(e.data);

    this.subscribe(value => worker.postMessage(value));

    return subject;
  }
}