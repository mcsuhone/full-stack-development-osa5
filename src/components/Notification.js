import React, {useState, useImperativeHandle, forwardRef} from 'react'

const Notification = forwardRef(function NotificationFunc (props, ref) {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('notification')
  
  const setTimedNotification = (message, type='notification') => {
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  useImperativeHandle(ref, () => {
    return {
      setTimedNotification
    }
  })

  if (notificationMessage === null) {
    return null
  }
  
  return (
    <div className={notificationType}>
      {notificationMessage}
    </div>
  )
})

export default Notification