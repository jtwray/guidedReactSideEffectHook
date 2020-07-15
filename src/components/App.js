import React, { useState, useEffect } from 'react'
// TASK 1 - import the axios lib from node_modules
import axios from 'axios'
// TASK 2 - import the contants from constants/index.js
import { API_KEY, BASE_URL } from '../constants'

import Details from './Details'

export default function App() {
  const [friends, setFriends] = useState([])
  const [currentFriendId, setCurrentFriendId] = useState(null)

  const openDetails = id => {
    setCurrentFriendId(id)
  }

  const closeDetails = () => {
    setCurrentFriendId(null)
  }

  // TASK 3 - make an effect that runs after FIRST DOM surgery
  // caused by the first render only. You'll need `useEffect` from React.
  // The effect should consist of a call to the API using axios.
  // On success, set the array of friend objects from the API into state.
  useEffect(() => {
    // this code only runs after the DOM surgery by React the first time
    axios.get(`${BASE_URL}/friends?api_key=${API_KEY}`)
      .then(res => {
        setFriends(res.data)
      })
      .catch(err => {
        debugger
      })
  }, [])

  const Friend = ({ info }) => ( // props is the object, info is the one prop this thing expects
    <div className='friend'>
      {info.name}
      <button onClick={(event) => openDetails(info.id)}>
        See details
      </button>
    </div>
  )

  return (
    <div className='container'>
      <h1>My friends:</h1>
      {
        // If the initial value of `friends` state weren't an empty array,
        // this would crash due to invoking `map` method on non-array.
        // We'd need a guard against this.
        friends.map(fr => {
          return <Friend key={fr.id} info={fr} />
        })
      }
      {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      }
    </div>
  )
}
