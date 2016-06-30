export class InlineWorker extends Worker {
  constructor(fn) {
    var blob: Blob = new Blob(
      [
        'self.cb = ', fn, ';',
        'self.onmessage = function (e) { self.postMessage(self.cb(e.data)) }'
      ],
      { type: 'text/javascript' }
    );

    super(URL.createObjectURL(blob));
  }

  success(fn): void {
    this.onmessage = fn;
  }

  error(fn): void {
    this.onerror = fn;
  }
}

// creates an inline web worker
export function createWorker(fn: Function): Worker {
  return new InlineWorker(fn);
}