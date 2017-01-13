import '../../src/add/operator/workerMap';

import { Observable } from 'rxjs/Observable';

fdescribe('Operator: Map', () => {
  it('Should return the concatted string', done => {
    Observable
      .from(['Hello World: '])
      .workerMap(function (item: number) {
        return item + 'I am from a worker.';
      })
      .subscribe(function (val) {
        expect(val).toBe('Hello World: I am from a worker.');

        done();
      });
  });
});
