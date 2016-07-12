# rxjs-worker [![CircleCI](https://circleci.com/gh/deebloo/rxjs-worker.svg?style=svg)](https://circleci.com/gh/deebloo/rxjs-worker)

RXJS extensions for adding web worker functionality via operators and observables

## Observables

### observable.fromWorker()
```TS
// web worker
const myWorker = new Worker('path/to/web-worker.js');
const observable3 = Observable.fromWorker(myWorker);

// function
const observable1 = Observable.fromWorker(() => {
  self.postMessage('Hello World');
});

// string
const observable2 = Observable.fromWorker('path/to/web-worker.js');
```

## Operators

### observable.mapWorker()
```TS
Observable
  .from(['Hello World'])
  .mapWorker(strng => {
    return strng + ', I am from a worker.';
  })
  .subscribe(res => {
    console.log(res); // Hello World, I am from a worker
  });
```

### observable.filterWorker()
```TS
Observable
  .from(['Hello World'])
  .filterWorker(strng => {
    return strng === 'Hello World';
  })
  .subscribe(res => {
    console.log(res); // Hello World
  });
```
