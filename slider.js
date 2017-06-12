$document = $(document)
$volumeSliderCounter = $('.volume-slider-counter > span')
$volumeSliderBox = $('.volume-slider-box')
$volumeSlider = $('.volume-slider')
$volumeSliderBall = $('.volume-slider-ball')

let sliderDragging = false;
let sliderDraggingCounter = 0;
let sliderDragDegree = 0;
const origin = '50% 50%'

const resetDragBox = (e) => {
  sliderDragging = false
  $volumeSliderBox.css("cursor", "pointer");
  $(e.target).css('cursor', 'default');
  $volumeSlider.css('cursor', 'default');
  $volumeSliderBox.css('transform', `rotate(${0}deg)`);
}

const paintSliderBall = () => {
  const percentage = 120 / 100 * sliderDraggingCounter
  $volumeSliderBall.css('left', percentage)
}

$volumeSliderBox.on('mousedown', () => sliderDragging = true)
$document.on('mouseup', resetDragBox)

$document.mousemove((e) => {
  if (sliderDragging) {
    $(e.target).css("cursor", "move");
    let mouse_x = e.pageX;
    let mouse_y = e.pageY;
    let radians = Math.atan2(mouse_x - 20, mouse_y - 20);
    let degree = (radians * (180 / Math.PI) * -1 + 60);
    let negativeChange = degree > sliderDragDegree
    sliderDragDegree = degree

    $volumeSliderBox.css('transform', `rotate(${degree}deg)`);
    $volumeSliderBox.css('transform-origin', origin);

    if (negativeChange && degree > 0) {
      sliderDraggingCounter = sliderDraggingCounter >= 100 ?
        100 : sliderDraggingCounter + 1;
    } else if (!negativeChange && degree < 0){
      sliderDraggingCounter = sliderDraggingCounter <= 0 ?
        0 : sliderDraggingCounter - 1;
    }
    paintCounter()
    paintSliderBall()
  }
})

paintCounter = () => $volumeSliderCounter.text(sliderDraggingCounter)
paintCounter()
