export function circleCollides(o1, o2) {
  const x1 = Math.abs(o1.x - o2.x)
  const y1 = Math.abs(o1.y - o2.y)
  const d = (x1 ** 2 + y1 ** 2) ** 0.5
  return d <= o1.radius + o2.radius
}

export const hyp = (a, b) => (a ** 2 + b ** 2) ** 0.5

export const degrad = (i) => i * (180 / Math.PI)

export function bounce(v, M, m, dx, dy, dvx, dvy, o) {
  const p1 = (2 * m) / M
  const p2 = (dvx * dx + dvy * dy) / (dx ** 2 + dy ** 2)
  return v - p1 * p2 * o
}

export function angle(x, y) {
  if (x === 0 && y === 0) return 0
  if (x === 0) return y > 0 ? 90 : 270
  const offset = x < 0 ? 180 : y < 0 ? 360 : 0
  return degrad(Math.atan(y / x)) + offset
}

// export const angle = (x, y) =>
//   degrad(Math.atan2(y, x)) + (y < 0 ? 360 : 0)

export function getNewVectors(o1, o2) {
  const m1 = o1.radius
  const m2 = o2.radius
  const M = m1 + m2
  const dx1 = o1.x - o2.x
  const dy1 = o1.y - o2.y
  const dx2 = o2.x - o1.x
  const dy2 = o2.y - o1.y
  const vx1 = o1.velocity * Math.cos(o1.angle * (Math.PI / 180))
  const vy1 = o1.velocity * Math.sin(o1.angle * (Math.PI / 180))
  const vx2 = o2.velocity * Math.cos(o2.angle * (Math.PI / 180))
  const vy2 = o2.velocity * Math.sin(o2.angle * (Math.PI / 180))
  return [
    bounce(vx1, M, m2, dx1, dy1, vx1 - vx2, vy1 - vy2, dx1),
    bounce(vy1, M, m2, dx1, dy1, vx1 - vx2, vy1 - vy2, dy1),
    bounce(vx2, M, m1, dx2, dy2, vx2 - vx1, vy2 - vy1, dx2),
    bounce(vy2, M, m1, dx2, dy2, vx2 - vx1, vy2 - vy1, dy2),
  ]
}
