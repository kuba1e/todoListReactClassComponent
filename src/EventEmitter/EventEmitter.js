class EventEmitter {
  constructor() {
    this.events = {}
  }

  static addSubscribe = (name) => {
    this.events[name] = []
  }

  subscribe = (name, listenerFunc) => {
    if (!this.events[name]) {
      EventEmitter.addSubscribe(name)
    }
    this.events[name].push(listenerFunc)
    return () => {
      this.events[name] = this.events[name].filter(
        (listener) => listener !== listenerFunc
      )
    }
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
/*
const emitter = {
  on: (event, fn) => EventEmitterInst.on(event, fn),
  off: (event, fn) => EventEmitterInst.off(event, fn),
  emit: (event, payload) => EventEmitterInst.emit(event, payload)
}
*/

// Object.freeze(emitter)

export default emitter
