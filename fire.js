const $campfire = $('.campfire')
const $log = $('.log')
const $campfireArea = $('.volume-fireplace')
const $volumeFire = $('.volume-fire')
const $fireVolume = $('.volume-fire-count > span')
const $fireVolImg = $('.volume-up-fire')

const campfireData = {
  volume: 0,
  visible: false,
  log: {
    left: '15',
    bottom: '5'
  },
  intervalId: null,
}

const campFireVolumeDisplay = () =>
  `<div class='volume-campfire-counter'>
    <div class='campfire-volume' style='height: ${campfireData.volume}%'></div>
  </div>`

const paintCampFireVolume = () => {
 const html = campFireVolumeDisplay()
 const $counter = $volumeFire.find('.volume-campfire-counter')
 if ($counter.length === 0) {
   $campfireArea.before(html)
 } else {
   $counter.replaceWith(html)
 }
}

const burn = () => {
  clearInterval(campfireData.intervalId)
  campfireData.intervalId =
    setInterval(function(){
      campfireData.volume = campfireData.volume - 2 < 0 ?
      0 : campfireData.volume - 2
      $fireVolume.text(campfireData.volume)
      if (campfireData.visible) paintCampFireVolume()
    }, 500)
}

const toggleFirePlace = () => {
 if (campfireData.visible) {
   const $counter = $volumeFire.find('.volume-campfire-counter')
   $counter.remove()
   $campfire.css('display', 'none')
   $log.css('display', 'none')
 } else {
   $campfire.css('display', 'block')
   $log.css('display', 'block')
   paintCampFireVolume()
 }
 campfireData.visible = !campfireData.visible
}

$fireVolImg.on('click', () => {
  toggleFirePlace()
})

$log.draggable()
$campfireArea.droppable({
  drop: function(e, ui){
    $log.css({
      left: campfireData.log.left + 'px',
      bottom: campfireData.log.bottom + 'px'
    })
    campfireData.volume =
      campfireData.volume + 15 > 100 ? 100 :
      campfireData.volume + 15

    paintCampFireVolume()
    $fireVolume.text(campfireData.volume)
    burn()
  }
})
