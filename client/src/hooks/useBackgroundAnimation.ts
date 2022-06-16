import { onMounted, reactive, ref } from 'vue'
import { AppColorsText as ColorsText } from '@/models/AppColors'
import { ElementBackground as Square } from '@/models/ElementBackground'


export const useBackgroundAnimation = () => {
  const backgroundBoard = ref<HTMLDivElement | null>(null)
  const backgroundBoardRect = ref<ClientRect | null>(null)
  const squaresAmount = ref<number | null>(null)

  const squaresArray = ref<Square[]>([])
  const squareColors = reactive<ColorsText[]>([
    ColorsText.GREEN,
    ColorsText.GREEN_LIGHT,
    ColorsText.GREEN_LIGHTER,
    ColorsText.GREEN_DARK,
    ColorsText.GREEN_DARKER,
    ColorsText.BLUE,
    ColorsText.BLUE_LIGHT,
    ColorsText.BLUE_LIGHTER,
    ColorsText.BLUE_DARK,
    ColorsText.BLUE_DARKER
  ])

  const getRandomColor = (): ColorsText => {
    const index = Math.floor(Math.random() * squareColors.length)
    return squareColors[index]
  }

  const getRandomElement = (elementsArray: Square[]) => {
    return elementsArray[Math.round(Math.random() * (elementsArray.length - 1))]
  }

  const setColor = (element: Square): void => {
    element.color = getRandomColor()
    element.active = true
  }

  const removeColor = (element: Square): void => {
    element.color = ColorsText.TRANSPARENT
    element.active = false
  }

  const initBackgroundAnimation = (): void => {
    if (backgroundBoard.value) {
      backgroundBoardRect.value = backgroundBoard.value.getBoundingClientRect()
      squaresAmount.value = Math.floor(backgroundBoardRect.value.width * backgroundBoardRect.value.height / (25 * 25))

      for (let i = 0; i < squaresAmount.value; i++) {
        squaresArray.value.push({
          id: i,
          color: ColorsText.TRANSPARENT,
          active: false
        })
      }
    }
  }

  onMounted(() => {
    initBackgroundAnimation()

    setInterval(() => {
      for (let i = 1; i < squaresAmount.value! * 0.002; i++) {
        const element = getRandomElement(squaresArray.value)
        setColor(element)
        setTimeout(() => {
          removeColor(element)
        }, 1000)
      }
    }, 600)
  })

  return {
    squaresArray,
    backgroundBoard,
    setColor,
    removeColor
  }
}
