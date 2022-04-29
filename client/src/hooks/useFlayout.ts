export const useFlayout = () => {
  const openFlyout = (group: HTMLDivElement, button: HTMLButtonElement): void => {
    const isFlyoutOpened = group.classList.contains('open')
    !isFlyoutOpened ? group.classList.add('open') : false
    button.setAttribute('aria-expanded', 'true')
  }

  const closeFlyout = (group: HTMLDivElement, button: HTMLButtonElement): void => {
    const isFlyoutOpened = group.classList.contains('open')
    isFlyoutOpened ? group.classList.remove('open') : false
    button.setAttribute('aria-expanded', 'false')
  }

  const toggleFlyout = (group: HTMLDivElement, button: HTMLButtonElement) => {
    const flyout = button.getAttribute('aria-expanded')
    if (flyout === 'true') {
      closeFlyout(group, button)
    } else {
      openFlyout(group, button)
    }
  }

  return {
    openFlyout,
    closeFlyout,
    toggleFlyout
  }
}
