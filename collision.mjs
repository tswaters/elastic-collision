export function detect(things) {
  const seen = new WeakSet()

  for (let i = 0; i < things.length; i += 1) {
    const asteroid = things[i]
    if (seen.has(asteroid)) continue

    const collision = things.find((collider) => {
      if (asteroid === collider) return false
      return collides(asteroid, collider)
    })

    if (collision) {
      seen.add(collision)
      seen.add(asteroid)

      const [newAsteroid, newCollission] = getNewVectors(asteroid, collision)

      Object.assign(asteroid, newAsteroid)
      Object.assign(collision, newCollission)
    }
  }
}

function sigDig(x) {
  return parseFloat(x.toFixed(3))
}

export function collides(o1, o2) {
  const x1 = Math.abs(o1.x - o2.x)
  const y1 = Math.abs(o1.y - o2.y)
  const d = (x1 ** 2 + y1 ** 2) ** 0.5
  return d <= o1.radius + o2.radius
}

const hyp = (a, b) => (a ** 2 + b ** 2) ** 0.5

const degrad = (i) => i * (180 / Math.PI)

export const angle = (x, y) => {
  if (x === 0 && y === 0) return 0
  if (x === 0) return y > 0 ? 90 : 270
  const offset = x < 0 ? 180 : y < 0 ? 360 : 0
  return Math.round(degrad(Math.atan(y / x)) + offset)
}

// export const angle = (x, y) =>
//   degrad(Math.atan2(y, x)) + (y < 0 ? 360 : 0)

export function getNewVectors(o1, o2) {
  const m1 = o1.radius
  const m2 = o2.radius
  const vx1 = Math.round(
    o1.velocity * sigDig(Math.cos(o1.angle * (Math.PI / 180)))
  )
  const vy1 = Math.round(
    o1.velocity * sigDig(Math.sin(o1.angle * (Math.PI / 180)))
  )
  const vx2 = Math.round(
    o2.velocity * sigDig(Math.cos(o2.angle * (Math.PI / 180)))
  )
  const vy2 = Math.round(
    o2.velocity * sigDig(Math.sin(o2.angle * (Math.PI / 180)))
  )
  const M = m1 + m2

  const dx1 = o1.x - o2.x
  const dy1 = o1.y - o2.y

  const dx2 = o2.x - o1.x
  const dy2 = o2.y - o1.y

  const calc = (v, m, dx, dy, dvx, dvy, o) => {
    const p1 = (2 * m) / M
    const p2 = (dvx * dx + dvy * dy) / (dx * dx + dy * dy)
    return Math.round(v - p1 * p2 * o)
  }

  const newX1 = calc(vx1, m2, dx1, dy1, vx1 - vx2, vy1 - vy2, dx1)

  const newY1 = calc(vy1, m2, dx1, dy1, vx1 - vx2, vy1 - vy2, dy1)

  const newX2 = calc(vx2, m1, dx2, dy2, vx2 - vx1, vy2 - vy1, dx2)

  const newY2 = calc(vy2, m1, dx2, dy2, vx2 - vx1, vy2 - vy1, dy2)

  return [
    { angle: angle(newX1, newY1), velocity: Math.round(hyp(newY1, newX1)) },
    { angle: angle(newX2, newY2), velocity: Math.round(hyp(newY2, newX2)) },
  ]
}
