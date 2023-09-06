export class Subscribable {
  subscribers: Function[]

  constructor() {
    this.subscribers = []
  }

  subscribe(f: Function) {
    this.subscribers.push(f)
  }

  unsubscribe(f: Function) {
    this.subscribers = this.subscribers.filter((g) => g !== f)
  }

  trigger(data: any) {
    this.subscribers.forEach((f) => f(data))
  }
}
