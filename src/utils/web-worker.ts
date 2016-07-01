// extend base web worker to make it inline
export class InlineWorker extends Worker {
  constructor(fn) {
    var blob: Blob = new Blob(
      [
        'self.cb=', fn, ';',
        'self.onmessage=function(e){self.postMessage(self.cb(e.data))}'
      ],
      { type: 'text/javascript' }
    );

    super(URL.createObjectURL(blob));
  }

  run(data) {
    this.postMessage(data);
  }
}

// creates an inline web worker
export function createWorker(fn: Function): InlineWorker {
  return new InlineWorker(fn);
}