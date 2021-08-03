let rfid = null
let canvas = null
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
  if (unrender.length > 0) {
    unrender.forEach((unrenderer) => unrenderer())
    unrender.splice(0, unrender.length)
  }
  things.forEach((thing) => {
    const unrenderer = thing.render({ ctx, width, height })
    if (unrenderer) unrender.push(unrenderer)
  })
}

export function stop() {
  cancelAnimationFrame(rfid)
  rfid = null
  canvas = null
  ctx = null
  width = null
  height = null
}
