import { useDispatch, useSelector } from "react-redux"
import { voteAnec } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdotes = () => {
  const dispatch = useDispatch()
      
  const anec = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    }   
      return state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter))
  })

  const anecdotes = [...anec]
      
  const vote = (anecdote) => {
    dispatch(voteAnec(anecdote))
    dispatch(setNotification(`You voted for "${anecdote.content}"`, 5))
    
    //dispatch(notificationChange(`You voted for "${anecdote.content}"`))
    //setTimeout(() => {
    //  dispatch(notificationChange(''))
    //}, 5000)
  }

  return (
    <>
    {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() =>
              vote(anecdote)}>vote</button>
          </div>
        </div>
    )}
    </>
  )
}

export default Anecdotes