import { circleCollides, getNewVectors, angle, hyp } from './math.mjs'

export function detect(things) {
  const seen = new WeakSet()

  for (let i = 0; i < things.length; i += 1) {
    const asteroid = things[i]
    if (seen.has(asteroid)) continue

    const collision = things.find((collider) => {
      if (asteroid === collider) return false
      return circleCollides(asteroid, collider)
    })

    if (collision) {
      seen.add(collision)
      seen.add(asteroid)

      const [newX1, newY1, newX2, newY2] = getNewVectors(asteroid, collision)

      Object.assign(asteroid, { vx: newX1, vy: newY1 })

      Object.assign(collision, { vx: newX2, xy: newY2 })
    }
  }
}
