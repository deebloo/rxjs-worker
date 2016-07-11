import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { createStaticWorker } from '../utils'

export function mapWorker(cb: Function): Subject<any> {
  const subject: Subject<any> = new Subject();
  const worker: Worker = createStaticWorker(cb);

  worker.onmessage = e => subject.next(e.data);
  worker.onerror = err => subject.error(err);

  this.subscribe(value => worker.postMessage(value));

  return subject;
}