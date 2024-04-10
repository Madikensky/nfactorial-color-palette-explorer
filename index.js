const heading = document.querySelector('h1')
const colorful = document.querySelector('h3 span')

const colorPaletteBlock = document.querySelector('.color-palette-block')

const popup = document.querySelector('.popup')

const colorPicker = document.querySelector('.color-picker')
const saturationPicker = document.querySelector('.color-picker-saturation')
const lightnessPicker = document.querySelector('.color-picker-lightness')

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

function rgbToHexConverter(...arr) {
  let res = ''
  arr.forEach((color) => {
    if (+color === 0) {
      res += '00'
    } else {
      let code = ''
      while (color > 0) {
        if (color % 16 === 15) {
          code += 'F'
        } else if (color % 16 === 14) {
          code += 'E'
        } else if (color % 16 === 13) {
          code += 'D'
        } else if (color % 16 === 12) {
          code += 'C'
        } else if (color % 16 === 11) {
          code += 'B'
        } else if (color % 16 === 10) {
          code += 'A'
        } else {
          code += color % 16
        }
        color = Math.floor(color / 16)
      }
      if (code.length === 1) {
        code += '0'
      }
      res += code.split('').reverse().join('')
    }
  })
  return res
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
  // const clearInputValue = document.querySelector('.color-picker')
  // clearInputValue.value = 0
  const clearInputs = document.querySelectorAll('input[type="range"]')
  clearInputs.forEach((e) => (e.value = 0))
})

const savedColorsMap = new Map()

saveColorBtn.addEventListener('click', () => {
  if (savedColorsMap.has(currentColor)) {
    return
  } else {
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
    savedColorsMap.set(currentColor, '')
  }
})

colorPicker.addEventListener('input', () => {
  saturationPicker.value = 0
  lightnessPicker.value = 0
  const value = colorPicker.value
  let red = 0
  let green = 0
  let blue = 0

  if (value <= 51) {
    red = 255
    green = Math.round((255 * value) / 51)
  } else if (value > 51 && value <= 102) {
    red = Math.round((255 * (102 - value)) / 51)
    green = 255
  } else if (value > 102 && value <= 153) {
    red = 0
    green = 255
    blue = Math.round((255 * (value - 102)) / 51)
  } else if (value > 153 && value <= 204) {
    red = 0
    green = Math.round((255 * (204 - value)) / 51)
    blue = 255
  } else {
    red = Math.round((255 * (value - 204)) / 51)
    green = 0
    blue = 255
  }

  const colors = rgbToHexConverter(red, green, blue)

  setColors(colors.slice(0, 2), colors.slice(2, 4), colors.slice(4, 6))
})

let previousValue = +saturationPicker.value

saturationPicker.addEventListener('input', () => {
  const currentValue = +saturationPicker.value

  let red = parseInt(currentColor.slice(1, 3), 16)
  let green = parseInt(currentColor.slice(3, 5), 16)
  let blue = parseInt(currentColor.slice(5), 16)

  const max = Math.max(red, green, blue)

  if (max === red) {
    green = currentValue
    blue = currentValue
  } else if (max === green) {
    red = currentValue
    blue = currentValue
  } else {
    red = currentValue
    green = currentValue
  }

  console.log(red, green, blue)
  console.log(currentValue)

  const colors = rgbToHexConverter(red, green, blue)
  setColors(colors.slice(0, 2), colors.slice(2, 4), colors.slice(4, 6))
  previousValue = currentValue
})

let prevBrightness = lightnessPicker.value

lightnessPicker.addEventListener('input', () => {
  const currBrightness = +lightnessPicker.value
  let red = parseInt(currentColor.slice(1, 3), 16)
  let green = parseInt(currentColor.slice(3, 5), 16)
  let blue = parseInt(currentColor.slice(5), 16)

  if (currBrightness > prevBrightness) {
    if (red < 255) {
      red += 1
    }
    if (green < 255) {
      green += 1
    }
    if (blue < 255) {
      blue += 1
    }
  } else {
    if (red > 0) {
      red -= 1
    }
    if (green > 0) {
      green -= 1
    }
    if (blue > 0) {
      blue -= 1
    }
  }
  console.log(red, green, blue)

  const colors = rgbToHexConverter(red, green, blue)
  setColors(colors.slice(0, 2), colors.slice(2, 4), colors.slice(4, 6))
  prevBrightness = currBrightness
})
