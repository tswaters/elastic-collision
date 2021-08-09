export const hyp = (a, b) => (a ** 2 + b ** 2) ** 0.5

export const degrad = (i) => i * (180 / Math.PI)

export function circleCollides(o1, o2) {
  const x1 = Math.abs(o1.x - o2.x)
  const y1 = Math.abs(o1.y - o2.y)
  return hyp(x1, y1) <= o1.radius + o2.radius
}

export function cirlceIntersectsRect(
  { x: rectX, y: rectY, width, height }, // rect
  { x: circleX, y: circleY, radius } // circle
) {
  const dx = circleX - Math.max(rectX, Math.min(circleX, rectX + width))
  const dy = circleY - Math.max(rectY, Math.min(circleY, rectY + height))
  return dx ** 2 + dy ** 2 < radius ** 2
}

export function bounce(v, M, m, dx, dy, dvx, dvy, o) {
  const p1 = (2 * m) / M
  const p2 = (dvx * dx + dvy * dy) / (dx ** 2 + dy ** 2)
  return v - p1 * p2 * o
}

export const angle = (x, y) => degrad(Math.atan2(y, x)) + (y < 0 ? 360 : 0)

export function getNewVectors(o1, o2) {
  const m1 = o1.radius
  const m2 = o2.radius
  const M = m1 + m2
  const dx1 = o1.x - o2.x
  const dy1 = o1.y - o2.y
  const dx2 = o2.x - o1.x
  const dy2 = o2.y - o1.y
  return [
    bounce(o1.vx, M, m2, dx1, dy1, o1.vx - o2.vx, o1.vy - o2.vy, dx1),
    bounce(o1.vy, M, m2, dx1, dy1, o1.vx - o2.vx, o1.vy - o2.vy, dy1),
    bounce(o2.vx, M, m1, dx2, dy2, o2.vx - o1.vx, o2.vy - o1.vy, dx2),
    bounce(o2.vy, M, m1, dx2, dy2, o2.vx - o1.vx, o2.vy - o1.vy, dy2),
  ]
}
