import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})


export const {setAnecdotes, appendAnecdote} = anecdoteSlice.actions

export const initializeAnectodes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}


export const voteAnec = anecObject => {
  return async dispatch => {
    const id = anecObject.id
    const changedAnec = {...anecObject, votes: anecObject.votes + 1}
    await anecdoteService.vote(id, changedAnec)
    
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
  
}

export default anecdoteSlice.reducer


/*
const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type) {
    case 'VOTE':
      const id = action.payload.id
      const anecToChange = state.find(a => a.id === id)
      const changedAnec = {...anecToChange, votes: anecToChange.votes + 1}
      return state.map(anec => anec.id !== id? anec: changedAnec)
    case 'CREATE':
      return state.concat(action.payload)
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: {id}
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    payload: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer
*/