class Ball {
  constructor({ x = 0, y = 0, vx = 0, vy = 0, radius = 30 }) {
    this.radius = radius
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
  }

  update({ width, height }) {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0) {
      this.x = width - Math.abs(this.x)
    }
    if (this.x > width) {
      this.x = this.x - width
    }
    if (this.y < 0) {
      this.y = height - Math.abs(this.y)
    }
    if (this.y > height) {
      this.y = this.y - height
    }
  }

  /**
   *
   * @param {{ctx: CanvasRenderingContext2D}}
   * @returns
   */
  render({ ctx, width, height }) {
    const { x, y } = this // snapshot
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI)
    ctx.stroke()
    return () => {
      ctx.fillStyle = 'black'
      ctx.fillRect(
        x - this.radius - 1,
        y - this.radius - 1,
        this.radius * 2 + 2,
        this.radius * 2 + 2
      )
    }
  }
}

export { Ball }
