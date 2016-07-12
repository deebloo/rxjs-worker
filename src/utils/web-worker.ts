// creates an inline web worker
export function createWorker(worker: Function | string): Worker {
  if (typeof worker === 'string') {
    return new Worker(worker);
  }

  const blob = new Blob(['self.onmessage = ', worker.toString()], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);

  return new Worker(url);
}