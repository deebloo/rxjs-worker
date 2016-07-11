import { Subject } from 'rxjs/Subject';
import { createWorker } from '../utils';
export function filterWorker(cb) {
    const subject = new Subject();
    const worker = createWorker(cb);
    let data;
    worker.onmessage = e => {
        if (data && e.data) {
            subject.next(data);
        }
        else {
            subject.next(null);
        }
    };
    this.subscribe(value => {
        data = value;
        worker.postMessage(value);
    });
    return subject;
}
//# sourceMappingURL=filterWorker.js.map