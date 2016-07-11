import { Observable } from 'rxjs/Observable';
import { mapWorker } from '../../operator/mapWorker';

Observable.prototype.mapWorker = mapWorker;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    mapWorker: any;
  }
}