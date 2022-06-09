const sonic = document.querySelector('.sonic')
const pipe = document.querySelector('.pipe')
const cloud = document.querySelector('.clouds')
const score = document.querySelector('#counter')
const lose = document.querySelector('.lose')

const gameboard = document.querySelector('.game-board')

const bestScore = document.querySelector('.best-score')
const lastScore = document.querySelector('.last-score')

let playerScore = 0
let bestPlayerScore = sessionStorage.getItem('bestScore', playerScore)
let lastPlayerScore = sessionStorage.getItem('Score', playerScore)

// Função que conta os pontos
const countScore = setInterval(() => {
  const pipePosition = pipe.offsetLeft

  if (pipePosition >= 130) {
    playerScore++
    score.innerHTML = playerScore
    sessionStorage.setItem('Score', playerScore)

    // Condição que verifica se a pontuação atual é maior que anterior
    if (playerScore > lastPlayerScore) {
      bestScore.innerHTML = sessionStorage.getItem('Score', playerScore)
      bestPlayerScore = sessionStorage.setItem('bestScore', playerScore)
    }
  }
}, 500)

// Escreve a última pontuação do jogador na tela
lastScore.innerHTML = sessionStorage.getItem('Score', playerScore)

// Escreve a melhor pontuação do jogador na tela
bestScore.innerHTML = sessionStorage.getItem('bestScore', playerScore)

// Função de pulo do personagem
function jump() {
  sonic.classList.add('jump')
  sonic.src = './assets/jump.gif'

  setTimeout(() => {
    sonic.classList.remove('jump')
    sonic.src = './assets/sonic.gif'
  }, 500)
}

// Função em loop que verifica se o personagem não acertou o Pipe
const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft
  const sonicPosition = +window.getComputedStyle(sonic).bottom.replace('px', '')

  if (pipePosition <= 120 && pipePosition > 0 && sonicPosition < 80) {
    pipe.style.animation = 'none'
    pipe.style.left = `${pipePosition}px`

    sonic.style.animation = 'death-animation 3s linear'
    sonic.style.bottom = `${sonicPosition}px`

    sonic.src = './assets/game-over.gif'

    sonic.style.width = '90px'
    sonic.style.marginLeft = '65px'

    lose.innerHTML = 'VOCÊ PERDEU!'

    gameboard.classList.add('lose-animation')
  }
}, 10)

// Keydown to reload
document.addEventListener('keydown', event => {
  if (event.key === ' ') {
    event.preventDefault()
    location.reload()
    clearInterval(loop)
  }
})

// Keydown to jump
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    jump()
  }
})
