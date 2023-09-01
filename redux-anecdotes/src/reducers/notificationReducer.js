import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            const notification = action.payload
            return notification
        }
    }
})

export const { notificationChange } = notificationSlice.actions

export const setNotification = (notification, sec) => {
    return dispatch => {
        dispatch(notificationChange(notification))
        setTimeout(() => {
        dispatch(notificationChange(''))
        }, sec * 1000)
    }
}

export default notificationSlice.reducer