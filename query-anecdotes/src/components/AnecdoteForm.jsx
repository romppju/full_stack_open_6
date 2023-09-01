import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
      dispatch({type: 'ERROR'})
      setTimeout(() => {
      dispatch({type: 'CLEAR'})  
    }, 5000)

    } else {    
      console.log('new anecdote:', content)     
      dispatch({type: 'CREATE', payload: content})
      setTimeout(() => {
        dispatch({type: 'CLEAR'})  
      }, 5000)
    
      newAnecMutation.mutate({content, votes: 0})
    }
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
