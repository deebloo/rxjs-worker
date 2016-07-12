import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { createWorker } from '../utils';

export function fromWorker(webWorker: Function | Worker | string) {
  const subject: Subject<any> = new Subject();

  let type: string = typeof webWorker;
  type = type.toLowerCase();

  let worker;

  if (webWorker instanceof Worker) {
    worker = webWorker;
  } else if (type === 'function' || type === 'string') {
    try {
      worker = createWorker(<string | Function>webWorker);
    } catch (err) {
      subject.error(err);
    }
  } else {
    subject.error('Must be a Web Worker, a path to a web worker, or a function');
  }

  worker.onmessage = e => subject.next(e.data);
  worker.onerror = err => subject.error(err);
  worker.postMessage({});

  return subject;
}
