import { Observable, ObservableInput } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Scheduler } from 'rxjs/Scheduler';
export declare class WorkerObservable extends Observable<any> {
    private ish;
    private scheduler;
    constructor(ish: ObservableInput<any>, scheduler: Scheduler);
    static create(fn: Function): Subject<any>;
}
export declare const fromWorker: typeof WorkerObservable.create;
