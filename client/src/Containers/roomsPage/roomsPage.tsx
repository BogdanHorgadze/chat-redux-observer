import React, { useEffect, useRef } from 'react'


const RoomsPage: React.FC = () => {

    const socket = useRef<WebSocket>()

    useEffect(() => {
        connect()
    }, [])

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            const message = {
                meta: 'showRooms'
            }
            socket.current?.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            console.log(message)
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    return (
        <div>
            asda
        </div>
    )
}

export default RoomsPage
