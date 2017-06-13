const $volumeDiceField = $('.volume-dice-field')
const $volumeDiceCount = $('.volume-dice-count > span')
const $volumeDiceButton = $('.volume-dice > button')

const volumeDiceData = {
  dieAmount: 16,
  dice: [],
  skip: [],
  volume: 0
}

const setVolume = () => {
  const vol = volumeDiceData.dice.reduce((num, i) => {return num + i}, 0)
  $volumeDiceCount.html(vol)
}

const paintDice = () => {
  const html = volumeDiceData.dice.reduce((string, value, y) => {
    let spots = []
    for(var i = 0; i < value; i++){
      spots.push(`<div class='die-count-${value} spot spot-${i}'></div>`)
    }
    spots = spots.join('')

    return string += volumeDiceData.skip.includes(y) ?
    `<div data-index=${y} class="volume-die locked">${spots}</div>` :
    `<div data-index=${y} class="volume-die">${spots}</div>`
  }, '')

  $volumeDiceField.html(html)
}

const getDieValue = (i) =>
  $($volumeDiceField.find('.volume-die')[i])
  .find('.spot')[0].className[10]

const rollDie = () => randomInt(1,6)

const rollDice = () => {
  let results = []
  for(var i = 0; i < 16; i++){
    results = volumeDiceData.skip.includes(i) ?
      results.concat(parseInt(getDieValue(i))) :
      results.concat(rollDie())
  }

  volumeDiceData.dice = results
  paintDice()
}

$volumeDiceButton.on('click', () => {
  let counter = 0;
  const intervalId = setInterval(() => {
    rollDice()
    counter += 1;
    if (counter === 7) {
      clearInterval(intervalId)
      setVolume()
    }
  }, 80)
})

const toggleLock = (target) => {
  const $target = $(target)
  const index = $target.data('index')
  $target.toggleClass('locked')

  volumeDiceData.skip = volumeDiceData.skip.includes(index) ?
    volumeDiceData.skip.filter((val) => val !== index) :
    volumeDiceData.skip.concat(index)
}

$volumeDiceField.on('click', (e) => {
  const className = e.target.className
  if (className.includes('volume-die')) {
    toggleLock(e.target)
    getDieValue(0)
  }
})
