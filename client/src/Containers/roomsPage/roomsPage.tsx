import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';

type usersType = {
    [key: string]: WebSocket
}

type room = {
    password?: any
    users: usersType
}
interface Rooms {
    [key: string]: room
}

const RoomsPage: React.FC = () => {

    const socket = useRef<WebSocket>()
    const [rooms, setRooms] = useState<Rooms>({})

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
            setRooms(message)
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    const renderRooms = (): any => {
        if (Object.keys(rooms).length) {
            return Object.keys(rooms).map((room,i) => {
                return (
                    <TableRow key={room + i}>
                        <TableCell>
                            {room}
                        </TableCell>
                        <TableCell>
                            {Object.keys(rooms[room].users).length}
                        </TableCell>
                        <TableCell>
                            {rooms[room].password ? 'close' : 'open'}
                        </TableCell>
                    </TableRow>
                )
            })
        }
    }

    return (
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            Room
                        </TableCell>
                        <TableCell>
                            users
                        </TableCell>
                        <TableCell>
                            type
                        </TableCell>
                    </TableRow>
                    {renderRooms()}
                </TableBody>
            </Table>
        </div>
    )
}

export default RoomsPage
