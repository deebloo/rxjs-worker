import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { createWorker, InlineWorker, liftObservable } from '../utils'

export class MapWorkerObservable extends Observable<any> {
  lift(operator): Observable<any> {
    return liftObservable(MapWorkerObservable, operator);
  }

  mapWorker(cb: Function): Subject<any> {
    const subject: Subject<any> = new Subject();
    const worker: InlineWorker = createWorker(cb);

    worker.onmessage = e => subject.next(e.data);
    worker.onerror = err => subject.error(err);

    this.subscribe(value => worker.run(value));

    return subject;
  }
}