class Ball {
  constructor({ x = 0, y = 0, vx = 0, vy = 0, radius = 30 }) {
    this.radius = radius
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
  }

  update({ width, height }) {
    const newx = this.x + this.vx
    const newy = this.y + this.vy

    if (newx - this.radius < 0 || newx + this.radius > width) this.vx *= -1
    else this.x = newx

    if (newy - this.radius < 0 || newy + this.radius > height) this.vy *= -1
    else this.y = newy
  }

  /**
   *
   * @param {{ctx: CanvasRenderingContext2D}}
   * @returns
   */
  render({ ctx, width, height }) {
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.stroke()
  }
}

export { Ball }
