class Ball {
  constructor({ x = 0, y = 0, velocity = 0, angle = 0, radius = 30 }) {
    this.radius = radius
    this.x = x
    this.y = y
    this.velocity = velocity
    this.angle = angle
  }

  update({ width, height }) {
    const dx = this.velocity * Math.cos(this.angle * (Math.PI / 180))
    const dy = this.velocity * Math.sin(this.angle * (Math.PI / 180))
    this.x += Math.round(dx)
    this.y += Math.round(dy)

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
