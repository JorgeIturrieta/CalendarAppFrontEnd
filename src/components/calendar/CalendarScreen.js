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
import {  eventSetActive } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
moment.locale('es');
const localizer = momentLocalizer(moment);
const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar ropa',
    user: {
        _id: '124wrerfds',
        name: 'Jorge'
    }

}]

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const { modalOpen } = useSelector(state => state.ui);
    console.log(modalOpen);

    const onDoubleClick = (e) => {       
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {  
        dispatch(eventSetActive(e));
        dispatch(uiOpenModal());
    }
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
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
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab/>
            <CalendarModal />
        </div>
    )
}
