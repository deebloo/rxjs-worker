export function createWorker(fn) {
  var blob = new Blob(
    [
      'self.cb = ', fn, ';',
      'self.onmessage = function (e) { self.postMessage(self.cb(e.data)) }'
    ],
    { type: 'text/javascript' }
  );

  var url = URL.createObjectURL(blob);

  return new Worker(url);
}