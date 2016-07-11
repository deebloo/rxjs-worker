import '../src/add/operator/mapWorker';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

describe('Create Store', () => {
  it('do stuff', done => {
    var foo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    var observable = Observable.from(foo);

    observable
      .mapWorker(function (item: number) {
        return item + 1;
      })
      .subscribe(function (val) {
        console.log('Hell0', val);
      }, function (err) {
        console.log(err);
      }, function () {
        console.log('complete')
      });
  });
});
