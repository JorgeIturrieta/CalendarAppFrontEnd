import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getSate) => {
        const { uid, name } = getSate().auth;
        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();
            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch(eventAddNew(event));
            }
        } catch (error) {
            console.log(error);
        }
    }
}
const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,
});

export const eventStartUpdated = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventUpdated(event));
            } else {
                throw new Error(body.message);
            }

        } catch (error) {
            console.log(error.message);
            Swal.fire('Error', error.message, 'error');
        }
    }
}
const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const startEventDeleted = (event) => {
    return async (dispatch, getSate) => {
        try {
            const { id } = getSate().calendar.activeEvent;
            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                throw new Error(body.message);
            }

        } catch (error) {
            console.log(error.message);
            Swal.fire('Error', error.message, 'error');
        }
    }
}
const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('events');
            const { events } = await resp.json();
            dispatch(eventLoaded(prepareEvents(events)));
        } catch (error) {
            console.log(error)
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () => ({
    type:types.eventLogout
});


