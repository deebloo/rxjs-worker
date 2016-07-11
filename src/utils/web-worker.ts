// creates an inline web worker
export function createWorker(fn: Function): Worker {
  const blob = new Blob(
    [
      'self.cb = ', fn.toString(), ';',
      'self.onmessage = function (e) { self.postMessage(self.cb(e.data)) }'
    ], {
      type: 'text/javascript'
    }
  );

  const url = URL.createObjectURL(blob);
  
  return new Worker(url);
}