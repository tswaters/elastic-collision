let tickSpeed = null
let tid = null
let state = null
let things
let width
let height

export function start(
  { width: initialWidth, height: initialHeight, things: initialThings },
  initialTickSpeed = 16
) {
  tickSpeed = initialTickSpeed
  things = initialThings
  width = initialWidth
  height = initialHeight
  tid = setTimeout(update, tickSpeed)
}

export function resize() {
  width = document.body.clientWidth
  height = document.body.clientHeight
}

export function update() {
  if (tid !== null) tid = setTimeout(update, tickSpeed)
  things.forEach((thing) => thing.update({ state, width, height }))
}

export function stop() {
  tickSpeed = null
  tid = null
  state = null
  clearTimeout(tid)
}
