let volume = 0
const odds = {
  minus: 3,
  plus: 6,
  exit: 9,
  rest: 10
}
const game = {
  playfield: [],
  location: 1
}
let interval = null;

const $ddr = $('.volume-ddr')
const $vol = $('.button-ddr')

const nextCol = () => {
  const num = randomInt(0, 9)
  const place = randomInt(0, 2)
  const row = ['', '', '']
  let type = null
  switch (true) {
    case num <= odds.minus: {
      type = '-'
      break;
    }
    case num <= odds.plus: {
      type = '+'
      break;
    }
    case num <= odds.exit: {
      type = 'x'
      break;
    }
    default: type = ''
  }
  row[place] = type
  return row
}

const paintBoard = () => {
  let html = game.playfield.reduce((string, col) => {
    return string += `<div class="ddr-column">${col.reduce((colString, field) => {
      const css = field === '+' ? 'plus' : field
      return colString += `<div class="ddr-field field${css}">${field}</div>`
    }, '')}</div>`
  }, '')
  html = `<div><h1>Volume: ${volume}</h1></div><div class="gameboard-ddr">${html}</div>`
  html += '<div class="ddr-overlay"></div>'
  $ddr.html(html)
}

const buttonClicks = () => {
  $('.ddr-overlay > .up').on('click', () => {
    game.location = game.location - 1 < 0 ? 0 : game.location - 1
    paintButtonOverlay()
  })


  $('.ddr-overlay > .down').on('click', () => {
    game.location = game.location + 1 > 2 ? 2 : game.location + 1
    paintButtonOverlay()
  })
}

const paintButtonOverlay = () => {
  html = '<div class="ddr-overlay">'
  html += '<div class="up"><i class="fa fa-arrow-up" aria-hidden="true"></i></div>'
  switch (game.location) {
    case 0: {
      html += '<div class="ddr-field"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>'
      html += '<div class="ddr-field"></div><div class="ddr-field"></div>'
      break;
    }
    case 1: {
      html += '<div class="ddr-field"></div>'
      html += '<div class="ddr-field"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>'
      html += '<div class="ddr-field"></div>'
      break;
    }
    default:
      html += '<div class="ddr-field"></div>'
      html += '<div class="ddr-field"></div>'
      html += '<div class="ddr-field"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>'
  }
  html += '<div class="down"><i class="fa fa-arrow-down" aria-hidden="true"></i></div>'
  html += "</div>"
  $ddr.find('.ddr-overlay').html(html)
  buttonClicks()
}

const evaluate = () => {
  switch (game.playfield[0][game.location]) {
    case '-': {
      volume = volume - 1 < 0 ? 0 : volume - 1
      break;
    }
    case '+': {
      volume = volume + 1 > 100 ? 100 : volume + 1
      break;
    }
    case 'x': {
      clearInterval(interval)
      $ddr.html('<i class="fa fa-volume-up button-ddr" aria-hidden="true"></i>')
      $('.button-ddr').on('click', init)
      break;
    }
  }
}

const tick = () => {
  gameboard = game.playfield.slice(1)
  gameboard.push(nextCol())
  game.playfield = gameboard;
  paintBoard()
  paintButtonOverlay()
  evaluate()
}

const init = () => {
  const playfield = [[[''],[''],['']]]
  for(let i = 0; i < 9; i++){
    playfield.push(nextCol())
  }

  game.playfield = playfield

  paintBoard()
  paintButtonOverlay()

  interval = setInterval(() => {
    tick()
  }, 450)
}



$vol.on('click', init)
