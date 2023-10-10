import React from 'react'
import ConnectionRequestNotiItem from './ConnectionRequestNotiItem'
import VideoUploadedNotificationItem from './VideoUploadedNotificationItem'
const notificationTypes = [
    "friendship-request","channel-video-publish"
]
export default function NotificationListRenderer({noti}) {
    if(noti.type==="connection-request"){
        return <ConnectionRequestNotiItem noti={noti} />
    }else{
        return <VideoUploadedNotificationItem noti={noti} />
    }
}
