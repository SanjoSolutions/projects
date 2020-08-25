export class Subscribable {
  constructor () {
    this.subscribers = []
  }

  subscribe (f) {
    this.subscribers.push(f)
  }

  unsubscribe (f) {
    this.subscribers = this.subscribers.filter(g => g !== f)
  }

  trigger (data) {
    this.subscribers.forEach(f => f(data))
  }
}
