# rxjs-worker [![CircleCI](https://circleci.com/gh/deebloo/rxjs-worker.svg?style=svg)](https://circleci.com/gh/deebloo/rxjs-worker)

RXJS extensions for adding web worker functionality via operators and observables

## Observables

### observable.fromWorker()
```TS
  Observable
    .fromWorker(() => {
      self.postMessage('Hello World');
    })
    .map(val => {
      return val + ': I am an observable.'
    })
    .subscribe(val => {
      console.log(val); // Hello World: I am an observable.
    });
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
