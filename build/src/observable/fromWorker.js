import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { createWorker } from '../utils';
export class WorkerObservable extends Observable {
    constructor(ish, scheduler) {
        super(null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    static create(fn) {
        const subject = new Subject();
        let worker;
        try {
            worker = createWorker(fn);
        }
        catch (err) {
            subject.error(err);
        }
        worker.onmessage = e => subject.next(e.data);
        worker.onerror = err => subject.error(err);
        worker.postMessage({});
        return subject;
    }
}
export const fromWorker = WorkerObservable.create;
//# sourceMappingURL=fromWorker.js.map