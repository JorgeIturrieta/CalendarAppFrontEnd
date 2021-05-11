import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    // TODO: leer del store los eventos  
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { modalOpen } = useSelector(state => state.ui);
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    console.log(modalOpen);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));

    }
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }
    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());

    }
    const eventSyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventSyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot = { onSelectSlot }
                selectable = { true }
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            {
                activeEvent && <DeleteEventFab />
            }
            <CalendarModal />
        </div>
    )
}
