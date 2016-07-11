import { Observable } from 'rxjs/Observable';
import { filterWorker } from '../../operator/filterWorker';

Observable.prototype.filterWorker = filterWorker;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    filterWorker: any;
  }
}