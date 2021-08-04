import assert from 'assert'
import { angle, circleCollides, getNewVectors } from './math.mjs'

const compare = (a, b, accuracy = 1.9) => {
  const big = Math.max(Math.abs(a), Math.abs(b))
  const ep = big * accuracy
  if (Math.abs(a - b) > ep) {
    assert.deepStrictEqual(a, b)
  }
}

describe('circleCollides', () => {
  describe('circleCollides', () => {
    it('works', () => {
      assert.deepStrictEqual(
        circleCollides({ x: 0, y: 5, radius: 10 }, { x: 5, y: 5, radius: 10 }),
        true
      )
    })
  })

  describe('angle', () => {
    it('1,0 => 0', () => {
      assert.deepStrictEqual(angle(1, 0), 0)
    })
    it('1,1 => 45', () => {
      assert.deepStrictEqual(angle(1, 1), 45)
    })
    it('0,1 => 90', () => {
      assert.deepStrictEqual(angle(0, 1), 90)
    })
    it('-1,1 => 135', () => {
      assert.deepStrictEqual(angle(-1, 1), 135)
    })
    it('-1,0 => 180', () => {
      assert.deepStrictEqual(angle(-1, 0), 180)
    })
    it('-1,-1 => 225', () => {
      assert.deepStrictEqual(angle(-1, -1), 225)
    })
    it('0,-1 => 270', () => {
      assert.deepStrictEqual(angle(0, -1), 270)
    })
    it('1,-1 => 315', () => {
      assert.deepStrictEqual(angle(1, -1), 315)
    })
  })

  describe('getNewVectors', () => {
    it('45 deg collision, upwards', () => {
      const [vx1, vy1, vx2, vy2] = getNewVectors(
        {
          x: 326,
          y: 174,
          radius: 50,
          angle: 315,
          velocity: 5,
        },
        {
          x: 424,
          y: 174,
          radius: 50,
          angle: 225,
          velocity: 5,
        }
      )

      compare(vx1, 3)
      compare(vy1, 3)
      compare(vx2, 3)
      compare(vy2, 3)
    })
  })
})
