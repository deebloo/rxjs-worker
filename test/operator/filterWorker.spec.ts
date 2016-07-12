import '../../src/add/operator/filterWorker';

import { Observable } from 'rxjs/Observable';

describe('Operator: Filter', () => {
  it('should return Hello World', done => {
    Observable
      .from(['Hello World'])
      .filterWorker(function (item: string) {
        return item === 'Hello World';
      })
      .subscribe(function (val) {
        expect(val).toBe('Hello World');

        done();
      });
  });

  it('should return null', done => {
    Observable
      .from(['Hello World'])
      .filterWorker(function (item: string) {
        return item !== 'Hello World';
      })
      .subscribe(function (val) {
        expect(val).toBe(null);

        done();
      });
  });
});
