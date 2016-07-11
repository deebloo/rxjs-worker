import { Subject } from 'rxjs/Subject';
import { createWorker } from '../utils';
export function mapWorker(cb) {
    const subject = new Subject();
    const worker = createWorker(cb);
    worker.onmessage = e => subject.next(e.data);
    worker.onerror = err => subject.error(err);
    this.subscribe(value => worker.postMessage(value));
    return subject;
}
//# sourceMappingURL=mapWorker.js.map