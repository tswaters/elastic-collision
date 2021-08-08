let rfid = null
let canvas = null

/**
 * @type {CanvasRenderingContext2D}
 */
let ctx
let width
let height
let things

export function start(
  canvas,
  { width: initialWidth, height: initialHeight, things: initialThings }
) {
  ctx = canvas.getContext('2d')
  width = initialWidth
  height = initialHeight
  things = initialThings
  rfid = requestAnimationFrame(render)
}

export function resize() {
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
  width = canvas.width
  height = canvas.height
}

const unrender = []

function render() {
  if (rfid !== null) rfid = requestAnimationFrame(render)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)
  things.forEach((thing) => thing.render({ ctx, width, height }))
}

export function stop() {
  cancelAnimationFrame(rfid)
  rfid = null
  canvas = null
  ctx = null
  width = null
  height = null
}
