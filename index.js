const heading = document.querySelector('h1')
const colorful = document.querySelector('h3 span')

const colorPaletteBlock = document.querySelector('.color-palette-block')

const popup = document.querySelector('.popup')

const colorPicker = document.querySelector('.color-picker')
const selectedColor = document.querySelector('.selected-color span')

const blockHex = document.querySelector('.block-hex')

const generateRandomColorBtn = document.querySelector(
  '.generate-random-color-btn button'
)

const saveColorBtn = document.querySelector('.save-color-btn')
const savedColors = document.querySelector('.saved-colors-set')

let currentColor = ''
const savedColorsArr = []

function setRainbowColor(element) {
  const colors = [
    '#ff0000',
    '#ff7f00',
    '#ffff00',
    '#00ff00',
    '#0000ff',
    '#4b0082',
    '#9400d3',
  ]
  const text = element.textContent
  element.textContent = ''
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span')
    const char = text.charAt(i)

    span.textContent = char
    span.style.color = colors[i % colors.length]
    element.appendChild(span)
  }
}

function copyColor(color) {
  navigator.clipboard.writeText(color).then(() => {
    popup.style.display = 'block'
    setTimeout(() => {
      popup.style.display = 'none'
    }, 500)
  })
}

function setColors(red, green, blue) {
  const setCurrentColor = `#${red}${green}${blue}`
  currentColor = setCurrentColor

  colorPaletteBlock.style.backgroundColor = currentColor
  selectedColor.style.backgroundColor = currentColor
  selectedColor.textContent = currentColor
  blockHex.textContent = currentColor

  colorPaletteBlock.addEventListener('click', () => {
    copyColor(currentColor)
  })

  selectedColor.addEventListener('click', () => {
    navigator.clipboard.writeText(currentColor).then(() => {
      copyColor(currentColor)
    })
  })
}

function setRandomColor() {
  const hexColorsSet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ]

  const randomHex = () => {
    return `${hexColorsSet[Math.floor(Math.random() * 16)]}${
      hexColorsSet[Math.floor(Math.random() * 16)]
    }`
  }

  const red = randomHex()
  const green = randomHex()
  const blue = randomHex()
  setColors(red, green, blue)
}

setRainbowColor(heading)
setRainbowColor(colorful)

setRandomColor()

generateRandomColorBtn.addEventListener('click', () => {
  setRandomColor()
})

saveColorBtn.addEventListener('click', () => {
  const savedColor = document.createElement('div')
  savedColor.className = 'saved-color'

  savedColor.addEventListener('click', () => {
    copyColor(currentColor)
  })

  const currentColorBlock = document.createElement('div')
  currentColorBlock.className = 'color-current'
  currentColorBlock.style.backgroundColor = currentColor

  const currentColorHex = document.createElement('div')
  currentColorHex.className = 'color-hex'
  currentColorHex.textContent = currentColor

  savedColor.append(currentColorBlock, currentColorHex)

  savedColors.style.display = 'flex'
  savedColors.append(savedColor)
})

colorPicker.addEventListener('input', (e) => {
  const value = colorPicker.value
  // let red,
  //   green,
  //   blue = 0

  // if (value <= 33) {
  //   red = 255
  //   green = Math.round((255 * value) / 33)
  //   blue = 0
  // } else if (value <= 66) {
  //   red = Math.round((255 * (66 - value)) / 33)
  //   green = 255
  //   blue = Math.round((255 * (value - 33)) / 33)
  // } else {
  //   red = 0
  //   green = Math.round((255 * (99 - value)) / 33)
  //   blue = 255
  // }
  setColors(red, green, blue)
})
