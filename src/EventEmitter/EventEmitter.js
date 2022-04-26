import EventEmitter from 'events'

const EventEmitterInst = new EventEmitter()

const emitter = {
  on: (event, fn) => EventEmitterInst.on(event, fn),
  off: (event, fn) => EventEmitterInst.off(event, fn),
  emit: (event, payload) => EventEmitterInst.emit(event, payload)
}

Object.freeze(emitter)

export default emitter
