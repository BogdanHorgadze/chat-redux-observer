import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
    const history = useHistory()

    useEffect(() => {
        connect()
        return () => socket.current?.close()
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

    const goBackHandler = () => {
        history.goBack()
    }

    const renderRooms = (): any => {
        if (Object.keys(rooms).length) {
            return Object.keys(rooms).map((room, i) => {
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
            <div onClick={goBackHandler}>
                <ArrowBackIcon />
            </div>
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
