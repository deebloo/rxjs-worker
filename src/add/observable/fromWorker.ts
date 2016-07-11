import { Observable } from 'rxjs/Observable';
import { fromWorker } from '../../observable/fromWorker'

Observable.fromWorker = fromWorker;

declare module 'rxjs/Observable' {
  namespace Observable {
    export let fromWorker;
  }
}