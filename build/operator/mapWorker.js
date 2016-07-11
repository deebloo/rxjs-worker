import { Subject } from 'rxjs/Subject';
import { createStaticWorker } from '../utils';
export function mapWorker(cb) {
    const subject = new Subject();
    const worker = createStaticWorker(cb);
    worker.onmessage = e => subject.next(e.data);
    worker.onerror = err => subject.error(err);
    this.subscribe(value => worker.postMessage(value));
    return subject;
}
//# sourceMappingURL=mapWorker.js.map