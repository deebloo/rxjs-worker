import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { createWorker, InlineWorker, liftObservable } from '../utils'

// only send back the data if it meets the expected criteria
export class FilterWorkerObservable extends Observable<any> {
  lift(operator) {
    return liftObservable(FilterWorkerObservable, operator);
  }

  mapWorker(cb: Function) {
    const subject: Subject<any> = new Subject();
    const worker: InlineWorker = createWorker(cb);
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