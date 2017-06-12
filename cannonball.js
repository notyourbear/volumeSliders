const $vup = $('.volume-up-cannonball')
const maxDegree = -90;
const increment = -1;
let intervalId = null;
let currentDegree = 0;
const width = 200;

const rotateTo = (target, degree) => target.css({transform: `rotate(${degree}deg)`})
const percentage = () => currentDegree / maxDegree

const fire = (target) => {
  let final = percentage() * width;
  if (final > width) final = width;
  target.animate({left: final}, 300, () => {
    target.css({opacity: '1'})
  })
}

const reset = (e) => {
  clearInterval(intervalId)
  const $target = $(e.target)
  intervalId = setInterval(() => {
    if (currentDegree === 0) {
      clearInterval(intervalId)
    } else {
      currentDegree -= increment;
      rotateTo($target, currentDegree)
    }
  }, 5)
  const ball = $target.find('.volume-ball')
  fire($(ball));
}

$vup.on('mousedown', (e) => {
  const $target = $(e.target)
  const ball = $target.find('.volume-ball')
  currentDegree = 0;
  $(ball).css({ left: '14px', opacity: 0 })
  intervalId = setInterval(() => {
    currentDegree += increment;
    if ( currentDegree > maxDegree) {
      rotateTo($target, currentDegree)
      $(ball).css('opacity', percentage())
    }
  }, 15)
})

$vup.on('mouseup', reset)
