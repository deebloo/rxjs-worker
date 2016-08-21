import { Subject } from 'rxjs/Subject';
import { createWorker } from '../utils';

/**
 * create an observable from a passed in web worker
 * or create a new worker from a function or a path
 */
export function fromWorker(webWorker: Function | Worker | string) {
  const subject: Subject<any> = new Subject();
  let worker;

  if (webWorker instanceof Worker) {
    worker = webWorker;
  } else {
    try {
      worker = createWorker(<string | Function>webWorker);
    } catch (err) {
      subject.error(err);
    }
  }

  worker.onmessage = e => subject.next(e.data);
  worker.onerror = err => subject.error(err);
  worker.postMessage('init');

  return subject;
}
