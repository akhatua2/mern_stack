import React, {useEffect, useState} from 'react';
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Input, Label, Alert, ButtonGroup } from 'reactstrap';
import moment from 'moment';
import './dashboard.css'


export default function Dashboard({history}) {

    const user_id = localStorage.getItem('user')
    const [events, setEvents] = useState([]);
    const [cSelected, setCSelected] = useState([]);
    const [rSelected, setRSelected] = useState(null);

    useEffect(()=> {
        getEvents()
    }, [])

    const getEvents = async (filter) => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard'
        const response = await api.get(url,{headers: {user_id}})
        setEvents(response.data)
    }

    const filterHandler = (query) => {
        setRSelected(query)
        getEvents(query)
    }

    const myEventHandler = async () => {
        setRSelected('myevents')
        const response = await api.get('/user/events',{headers: {user_id}})
        setEvents(response.data)

    }

    console.log(events)

    return(
        
        <>
            <div> 
                <>
                    <Button color="success" onClick={() => filterHandler(null)} active={rSelected === null}>All Sports    </Button>{' '}
                    <Button color="primary" onClick={() => filterHandler('Running')} active={rSelected === 'Running'}>Running </Button>{' '}
                    <Button color="info" onClick={() => filterHandler('Cycling')} active={rSelected === 'Cycling'}>Cycling </Button>{' '}
                    <Button color="warning" onClick={() => filterHandler('Swimming')} active={rSelected === 'Swimming'}>Swimming</Button>{' '}
                    <Button color="danger" onClick={() => filterHandler('Hiking')} active={rSelected === 'Hiking'}>Hiking  </Button>{' '}
                    <Button color="secondary" onClick={() => history.push('/events')}> Create Event </Button>{' '}
                    <Button outline color="success" onClick={myEventHandler} active={rSelected === 'myevents'}> My Events </Button>


                </>
            </div>
            
            <ul className="events-list">
                {events.map(event => (
                    <li key={event._id}>
                        
                        <strong>{event.title}</strong>
                        <header style={{ backgroundImage: `url(${event.thumbnail_url})`}}/>
                        <span>Event Date: {moment(event.date).format('DD/MM/YYYY')} </span>
                        <span>Price: ${parseFloat(event.price).toFixed(2)} </span>
                        <span>{event.description} </span>
                        <Button color="primary" className="Sub"> Subscribe</Button>

                    </li>
                ))}        
            </ul>
        </>
    )

}

