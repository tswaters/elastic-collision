import assert from 'assert'
import { angle, collides, getNewVectors } from './collision.mjs'

describe('collision', () => {
  describe('collides', () => {
    it('works', () => {
      assert.deepStrictEqual(
        collides({ x: 0, y: 5, radius: 10 }, { x: 5, y: 5, radius: 10 }),
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
    it('even x plane', () => {
      assert.deepStrictEqual(
        getNewVectors(
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
        ),
        [
          { angle: 225, velocity: 6 },
          { angle: 315, velocity: 6 },
        ]
      )
    })
  })
})
