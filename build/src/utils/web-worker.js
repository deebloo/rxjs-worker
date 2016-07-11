// creates an inline web worker
export function createWorker(worker) {
    if (typeof worker === 'string') {
        return new Worker(worker);
    }
    else {
        const blob = new Blob(['self.onmessage = ', worker.toString()], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        return new Worker(url);
    }
}
//# sourceMappingURL=web-worker.js.map