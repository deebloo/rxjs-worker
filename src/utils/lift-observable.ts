export function liftObservable(Base, operator) {
  const observable = new Base();
  observable.source = this;
  observable.operator = operator;
  return observable;
}