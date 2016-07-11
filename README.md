# rxjs-worker

RXJS extensions for adding web worker functionality via operators and observables


## Operators

### observable.mapWorker()
```TS

Observable
  .from(['Hello World'])
  .mapWorker(string => {
    return string + ', I am from a worker.';
  })
  .subscribe(res => {
    console.log(res); // Hello World, I am from a worker
  });
```

### observable.filterWorker()
```TS

Observable
  .from(['Hello World'])
  .mapWorker(string => {
    return string === 'Hello World';
  })
  .subscribe(res => {
    console.log(res); // Hello World
  });
```
