const radioData = {
  volume: 0,
  muted: false
}

const $volumeRadios = $('.volume-up-radios')

const makeForm = () => {
  let radios = ''
  for (let i = 1; i < 101; i++) {
    const checked = i === radioData.volume ? 'checked' : ''
    radios += `<input type='radio' name='radioVolume' id='radio-${i}' value='${i}' ${checked}>`
    radios += `<label for='radio-${i}'>${i}</label>`
  }

  let muted = radioData.muted ? 'checked' : ''
  return `
    <div>
      <form>${radios}</form>
      <div class='radio-mutebox'>
        <input type='checkbox' id='radio-mute' ${muted}>
        <label for='radio-mute'>Mute</label>
      </div>
    </div>`
}

const paintForm = form => {
  $volumeRadios.after(form)
  $inputs = $('.volume-up-radios + div')
  $inputs.on('click', (e) => {
    if (e.target.value) {
      if (Number.isInteger(parseInt(e.target.value))) {
        radioData.volume = parseInt(e.target.value)
      } else {
        radioData.muted = $(e.target).is(':checked')
      }
    }
  })
}

$volumeRadios.on('click', (e) => {
  const $target = $(e.target)
  $target.next().length === 0 ?
    paintForm(makeForm()) :
    $target.next().remove()
})
