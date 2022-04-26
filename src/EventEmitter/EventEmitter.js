import EventEmitter from 'eventemitter3'

const EventEmitterInst = new EventEmitter()

const Emitter = {
  on: (event, fn) => EventEmitterInst.on(event, fn),
  off: (event, fn) => EventEmitterInst.off(event, fn),
  emit: (event, payload) => EventEmitterInst.emit(event, payload)
}

Object.freeze(Emitter)

export default Emitter
