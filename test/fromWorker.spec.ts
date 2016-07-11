import '../src/add/observable/fromWorker';

import { Observable } from 'rxjs/Observable';

describe('Operator: Map', () => {
  it('Should return the concatted string', done => {
    Observable
      .fromWorker(function () {
        return 'Hello World';
      })
      .subscribe(function (val) {
        console.log(val);

        done();
      })
  });
});