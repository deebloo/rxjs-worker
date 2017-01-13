import { Observable } from 'rxjs/Observable';
import { workerMap } from '../../operator/workerMap';

Observable.prototype.workerMap = workerMap;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    workerMap: any;
  }
}