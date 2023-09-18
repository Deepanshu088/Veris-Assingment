import { createSlice } from '@reduxjs/toolkit';
import { EventType } from '../../../components/Shared/Table/Table';

export type UserType = {
    isLoggedIn: boolean,
    authToken: string | null | undefined;
    userDetails: {
        id: string,
        email: string,
    } | undefined | null
    events: EventType[] | []
}

let initialState: UserType = {
    isLoggedIn: false,
    authToken: null,
    userDetails: null,
    events: []
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, actions) => {
            let payload = actions.payload;
            state.isLoggedIn = true;
            state.authToken = payload.token;
            state.userDetails = payload.user;
        },
        logout: state => initialState,
        setEvents: (state, actions) => {
            return {...state, events: actions.payload}
        },
        addEvent: (state, actions) => {
            let events = JSON.parse(JSON.stringify(state.events))
            events.push({...actions.payload});
            return {...state, events: [...events]}
        }
    }
})

export const { login, logout, setEvents, addEvent } = userSlice.actions;
export default userSlice.reducer;