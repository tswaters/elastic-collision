import { circleCollides, cirlceIntersectsRect, getNewVectors } from './math.mjs'

export function detect(things, { width, height }) {
  const qt = new QuadTree({
    things,
    width,
    height,
    match: cirlceIntersectsRect,
  })

  things.forEach((thing) => {
    qt.check(thing).forEach((check) => {
      if (
        thing !== check &&
        circleCollides(
          {
            ...thing,
            x: thing.x + thing.vx,
            y: thing.y + thing.vy,
          },
          {
            ...check,
            x: check.x + check.vx,
            y: check.y + check.vy,
          }
        )
      ) {
        const [newX1, newY1, newX2, newY2] = getNewVectors(thing, check)
        Object.assign(thing, { vx: newX1, vy: newY1 })
        Object.assign(check, { vx: newX2, xy: newY2 })
      }
    })
  })
}

export class QuadTree {
  constructor({
    things = [],
    limit = 5,
    width,
    height,
    x = 0,
    y = 0,
    match = cirlceIntersectsRect,
  }) {
    this.match = match
    this.tl = null
    this.tr = null
    this.bl = null
    this.br = null
    this.things = []
    this.limit = limit
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    things.forEach((thing) => this.insert(thing))
  }
  split() {
    this.tl = new QuadTree({
      width: this.width / 2,
      height: this.height / 2,
      things: this.things,
      x: this.x,
      y: this.y,
      match: this.match,
    })
    this.tr = new QuadTree({
      width: this.width / 2,
      height: this.height / 2,
      things: this.things,
      x: this.x + this.width / 2,
      y: this.y,
      match: this.match,
    })
    this.bl = new QuadTree({
      width: this.width / 2,
      height: this.height / 2,
      things: this.things,
      x: this.x,
      y: this.y + this.height / 2,
      match: this.match,
    })
    this.br = new QuadTree({
      width: this.width / 2,
      height: this.height / 2,
      things: this.things,
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
      match: this.match,
    })
    this.things = []
  }
  check(thing) {
    if (!this.match(this, thing)) return []
    if (this.tr == null) return this.things
    return [].concat(
      this.tl.check(thing),
      this.tr.check(thing),
      this.bl.check(thing),
      this.br.check(thing)
    )
  }
  insert(thing) {
    if (!this.match(this, thing)) return
    if (this.tr == null) {
      this.things.push(thing)
      if (this.things.length === this.limit) {
        this.split()
      }
    } else {
      this.tr.insert(thing)
      this.tl.insert(thing)
      this.br.insert(thing)
      this.bl.insert(thing)
    }
  }
}
