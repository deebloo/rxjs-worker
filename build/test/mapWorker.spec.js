import '../src/add/operator/mapWorker';
import { Observable } from 'rxjs/Observable';
describe('Operator: Map', () => {
    it('Should return the concatted string', done => {
        Observable
            .from(['Hello World: '])
            .mapWorker(function (item) {
            return item + 'I am from a worker.';
        })
            .subscribe(function (val) {
            expect(val).toBe('Hello World: I am from a worker.');
            done();
        });
    });
});
//# sourceMappingURL=mapWorker.spec.js.map