import React, {useEffect, useState} from 'react';
import api from '../../services/api'
import { Button, Alert} from 'reactstrap';
import moment from 'moment';
import './dashboard.css'


export default function Dashboard({history}) {

    const user_id = localStorage.getItem('user_id')
    const user = localStorage.getItem('user')
    const [events, setEvents] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    useEffect(()=> {
        getEvents()
    }, [])

    const getEvents = async (filter) => {
        try {
            const url = filter ? `/dashboard/${filter}` : '/dashboard'
            const response = await api.get(url,{headers: {user: user}})
            setEvents(response.data.events)
            
        } catch (error) {
            history.push('/login') 
        }
    }

    const filterHandler = (query) => {
        setRSelected(query)
        getEvents(query)
    }

    const myEventHandler = async () => {
        try {
            setRSelected('myevents')
            const response = await api.get(`/user/events/${user}`, {headers: {user: user}})
            setEvents(response.data.events)
            
        } catch (error) {
            history.push('/login') 
        }

    }

    const deleteEvent = async (id) => {
        try {
            await api.delete(`/event/${id}`,{headers: {user: user}})
            setSuccessMessage(true)
                setTimeout(() => {
                    setSuccessMessage(false)
                    filterHandler(null)
                }, 2000)
        } catch (error) {
            setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 2000)
        }
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
                        <header style={{ backgroundImage: `url(${event.thumbnail_url})`}}>
                            {event.user === user_id ? <div><Button size='sm' onClick={() => deleteEvent(event._id)} color="danger" active={rSelected === null}>Delete</Button></div> : ""}
                        </header>    
                        <span>Event Date: {moment(event.date).format('DD/MM/YYYY')} </span>
                        <span>Price: ${parseFloat(event.price).toFixed(2)} </span>
                        <span>{event.description} </span>
                        <Button color="primary" className="Sub"> Subscribe</Button> 

                    </li>
                ))} 
            </ul>
                {errorMessage ? (
                <Alert className="event-validation" color="danger"> Couldn't delete event! </Alert>
                ) : ""}
                {successMessage ? (
                    <Alert className="event-validation" color="success"> Event deleted successfully</Alert>
                ) : ""}       
        </>
    )

}

