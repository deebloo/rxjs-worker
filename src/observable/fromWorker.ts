import { Observable, ObservableInput } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Scheduler } from 'rxjs/Scheduler';

import { createWorker } from '../utils';

export class WorkerObservable extends Observable<any> {
  constructor(private ish: ObservableInput<any>, private scheduler: Scheduler) {
    super(null);
  }

  static create(fn: Function) {
    const subject: Subject<any> = new Subject();
    let worker: Worker;

    try {
      worker = createWorker(fn);
    } catch (err) {
      subject.error(err);
    }

    worker.onmessage = e => subject.next(e.data);
    worker.onerror = err => subject.error(err);
    worker.postMessage({});

    return subject;
  }
}

export const fromWorker = WorkerObservable.create;
