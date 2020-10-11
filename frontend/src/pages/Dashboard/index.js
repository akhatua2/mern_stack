import React, {useEffect, useState} from 'react';
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import moment from 'moment';
import './dashboard.css'


export default function Dashboard() {

    const user_id = localStorage.getItem('user')

    const [events, setEvents] = useState([]);

    useEffect(()=> {
        getEvents()
    }, [])

    const getEvents = async (filter) => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard'
        const response = await api.get(url,{headers: {user_id}})
        setEvents(response.data)
    }

    console.log(events)
    return(
        <ul className="events-list">
            {events.map(event => (
                <li key={event._id}>
                    
                    <strong>{event.title}</strong>
                    <header style={{ backgroundImage: `url(${event.thumbnail_url})`}}/>
                    <span>Event Date: {moment(event.date).format('DD/MM/YYYY')} </span>
                    <span>Price: ${parseFloat(event.price).toFixed(2)} </span>
                    <span>{event.description} </span>
                    <Button color="primary"> Subscribe</Button>

                </li>
            ))}        
        </ul>
    )
}

