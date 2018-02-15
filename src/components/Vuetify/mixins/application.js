export default {
  bar: 0,
  bottom: 0,
  footer: 0,
  left: 0,
  right: 0,
  top: 0,
  registered: {
    bar: {},
    bottom: {},
    footer: {},
    left: {},
    right: {},
    top: {}
  },
  register (uid, location, value) {
    this.registered[location][uid] = value || 0
    this.setValues(location)
  },
  setValues (location) {
    this[location] = this.values(location)
  },
  unregister (uid, location) {
    delete this.registered[location][uid]
    this.setValues(location)
  },
  values (location) {
    return Object.values(this.registered[location]).reduce((a, c) => (a + c), 0)
  }
}
