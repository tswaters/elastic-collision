import {
  start as startGame,
  stop as stopGame,
  resize as resizeGame,
} from './game-loop.mjs'

import {
  start as startRender,
  stop as stopRender,
  resize as resizeRender,
} from './render-loop.mjs'

import { Ball } from './ball.mjs'

let startButton
let stopButton
let canvas
let ctx
let width
let height

const things = []

document.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('game')
  ctx = canvas.getContext('2d')
  width = canvas.width = document.body.clientWidth
  height = canvas.height = document.body.clientHeight

  stopButton = document.getElementById('stop-button')
  stopButton.addEventListener('click', handleStopButtonClick)

  startButton = document.getElementById('start-button')
  startButton.addEventListener('click', handleStartButtonClick)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') handleStopButtonClick(e)
  })

  handleStartButtonClick()
})

document.addEventListener('resize', () => {
  resizeRender()
  resizeGame()
})

function handleStartButtonClick(e) {
  e?.preventDefault()
  const initialState = { width, height, things }

  for (let i = 0; i < 30; i += 1) {
    things.push(
      new Ball({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        velocity: Math.floor(Math.random() * 5),
        angle: Math.floor(Math.random() * 360),
        radius: Math.floor(Math.random() * 5) + 10,
      })
    )
  }

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, width, height)
  startGame(initialState)
  startRender(canvas, initialState)
}

function handleStopButtonClick(e) {
  e.preventDefault()
  stopGame()
  stopRender()
  things.flush()
}
