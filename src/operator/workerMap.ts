import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { createStaticWorker } from '../utils';

// map of existing workers so we don't keep creating new ones
let workers = {};

export function workerMap(cb: Function): Subject<any> {
  const subject: Subject<any> = new Subject();

  let workerString = cb.toString();
  let worker: Worker;

  if(workers[workerString]) {
    worker = workers[workerString];
  } else {
    worker = createStaticWorker(cb);

    workers[workerString] = worker;
  }

  worker.onmessage = e => subject.next(e.data);
  worker.onerror = err => subject.error(err);

  this.subscribe(value => worker.postMessage(value));

  return subject;
}