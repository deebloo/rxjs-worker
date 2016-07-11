import '../src/add/operator/mapWorker';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

describe('Create Store', () => {
  it('do stuff', done => {
    Observable
      .from(['Hello World: '])
      .mapWorker(function (item: number) {
        return item + 'I am from a worker.';
      })
      .subscribe(function (val) {
        expect(val).toBe('Hello World: I am from a worker.');

        done();
      });
  });
});
