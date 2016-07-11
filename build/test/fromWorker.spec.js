import '../src/add/observable/fromWorker';
import { Observable } from 'rxjs/Observable';
describe('Observable: fromWorker', () => {
    it('Should return the concatted string', done => {
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
});
//# sourceMappingURL=fromWorker.spec.js.map