import React from 'react'
import {v4 as uuidV4} from 'uuid'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    const [roomId, setRoomId] = useState('')
    const [username, setUsername] = useState('')
    const createNewRoom = (e) => {
        e.preventDefault()
        const id=uuidV4()
        setRoomId(id)
        toast.success('Created a new room')
    }
    const joinRoom = ()=> {
        if(!roomId || !username) {
            toast.error('Room id or username is not filled')
            return
        }
        // Redirect
        navigate(`/editor/${roomId}`,{
            state:{
                username
            }
        })
    }
    return (
    <div className='homePageWrapper'>
        <div className='formWrapper'>
            {/* <img src='/code-sync.png' alt='code-sync-logo'></img> */}
            <h1 className='mainLabel'>Real Time Collaborative Editor</h1>
            <div className='inputGroup'>
                <input type='text' className='inputBox' placeholder='Enter ROOM ID' onChange={(e)=> setRoomId(e.target.value)} value={roomId}/>
                <input type='text' className='inputBox' placeholder='USERNAME' onChange={(e)=> setUsername(e.target.value)} value={username}/>
                <button className='btn joinBtn' onClick={ joinRoom }>Join</button>
                <span className='createInfo'>
                    Want to create a new room &nbsp;
                    <a onClick={createNewRoom} href='' className='createNewBtn'>click here</a>
                </span>
            </div>
        </div>
        <footer>
            <h4>
                Built by&nbsp; <a href='https://github.com.kishansolanki20'>Kishan Singh</a>
            </h4>
        </footer>
    </div>
  )
}

export default Home
