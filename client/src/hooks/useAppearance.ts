import { onMounted, ref } from 'vue'

export const useAppearance = () => {
  const userTheme = ref(localStorage.getItem('theme') || '')
  const isUserPrefersDarkMode = ref<Boolean>(false)
  const setTheme = (theme: string) => {
    localStorage.setItem('theme', theme)
    userTheme.value = theme
    document.documentElement.className = theme
  }

  const toggleTheme = () => {
    userTheme?.value === 'light-theme'
      ? setTheme('dark-theme')
      : setTheme('light-theme')
  }

  const setPreferenceTheme = (): void => {
    isUserPrefersDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isUserPrefersDarkMode.value) {
      userTheme.value = 'dark-theme'
      setTheme('dark-theme')
    } else {
      userTheme.value = 'light-theme'
      setTheme('light-theme')
    }
  }

  const setPresetTheme = (presetTheme: string): void => {
    setTheme(presetTheme)
  }

  const findAppearance = (): void => {
    userTheme.value === ''
      ? setPreferenceTheme()
      : setPresetTheme(userTheme.value)
  }

  onMounted(() => {
    findAppearance()
  })

  return {
    toggleTheme,
    userTheme
  }
}
