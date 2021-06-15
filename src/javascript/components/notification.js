const ELE_NOTIFICATION = document.querySelector('.notification')
const ELE_NOTIFICATION_CONTENT = document.querySelector('.notification .alert__content')

export const showNotification = (message) => {
  ELE_NOTIFICATION.classList.remove('display-none')
  ELE_NOTIFICATION_CONTENT.textContent = message
  if (ELE_NOTIFICATION.classList.contains('close-notification')) {
    ELE_NOTIFICATION.classList.replace('close-notification', 'show-notification')
  } else ELE_NOTIFICATION.classList.add('show-notification')
  setTimeout(() => {
    ELE_NOTIFICATION_CONTENT.textContent = message
    ELE_NOTIFICATION.classList.replace('show-notification', 'close-notification')
    setTimeout(() => {
      ELE_NOTIFICATION.classList.add('display-none')
    }, 950)
  }, 1500)
}