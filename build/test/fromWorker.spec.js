import '../src/add/observable/fromWorker';
import { Observable } from 'rxjs/Observable';
import { createWorker } from '../src/utils';
describe('Observable: fromWorker', () => {
    it('Should accept a function and return the concatted string', done => {
        Observable
            .fromWorker(function () {
            this.postMessage('Hello World');
        })
            .map(function (val) {
            return val + ': I am an observable.';
        })
            .subscribe(function (val) {
            expect(val).toBe('Hello World: I am an observable.');
            done();
        });
    });
    it('Should accept a web worker instance and return the concatted string', done => {
        const worker = createWorker(function () {
            this.postMessage('Hello World');
        });
        Observable
            .fromWorker(worker)
            .map(function (val) {
            return val + ': I am an observable.';
        })
            .subscribe(function (val) {
            expect(val).toBe('Hello World: I am an observable.');
            done();
        });
    });
});
//# sourceMappingURL=fromWorker.spec.js.map