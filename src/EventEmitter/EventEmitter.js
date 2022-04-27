class EventEmitter {
  constructor() {
    this.events = {}
  }

  addSubscribe = (name) => {
    this.events[name] = []
  }

  subscribe = (name, listenerFunc) => {
    if (!this.events[name]) {
      this.addSubscribe(name)
    }
    this.events[name].push(listenerFunc)
  }

  deleteSubscribe = (name, listenerFunc) => {
    this.events[name] = this.events[name].filter(
      (listener) => listener !== listenerFunc
    )
  }

  emit = (name, data) => {
    const listener = (callback) => [callback(data)]
    this.events[name].forEach(listener)
  }
}

const emitter = new EventEmitter()

export default emitter
