import React, {useEffect, useState, useMemo} from 'react';
import api from '../../services/api'
import { Button, Alert} from 'reactstrap';
import moment from 'moment';
import './dashboard.css'
import socketio from 'socket.io-client';

export default function Dashboard({history}) {

    const user_id = localStorage.getItem('user_id')
    const user = localStorage.getItem('user')
    const [events, setEvents] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('');
    const [eventsRequest, setEventsRequest] = useState([])


    useEffect(()=> {
        if(!user) {
            history.push("/login")
        } else {
            getEvents()
        }
    }, [])

    const socket = useMemo(
        () =>
            socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    useEffect(() => {
        socket.on('registration_request', data => setEventsRequest([...eventsRequest, data]));
    }, [eventsRequest, socket])


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

    const deleteEvent = async (eventId) => {
        try {
            await api.delete(`/event/${eventId}`, { headers: { user: user } });
            setSuccess(true)
            setMessageHandler('The event was deleted successfully!')
            setTimeout(() => {
                setSuccess(false)
                filterHandler(null)
                setMessageHandler('')
            }, 2500)

        } catch (error) {
            setError(true)
            setMessageHandler('Error when deleting event!')
            setTimeout(() => {
                setError(false)
                setMessageHandler('')
            }, 2000)
        }
    }


    const logoutHandler = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('user_id')
        history.push('/login')
    }


    const registrationRequestHandler = async (event) => {
        try {
            await api.post(`/registration/${event.id}`, {}, { headers: { user } })
            console.log("Done")

            setSuccess(true)
            setMessageHandler(`The request for the event ${event.title} was successfully!`)
            setTimeout(() => {
                setSuccess(false)
                filterHandler(null)
                setMessageHandler('')
            }, 2500)

        } catch (error) {
            setError(true)
            setMessageHandler(`The request for the event ${event.title} wasn't successfully!`)
            setTimeout(() => {
                setError(false)
                setMessageHandler('')
            }, 2000)
        }
    }


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
                    <Button outline color="success" onClick={myEventHandler} active={rSelected === 'myevents'}> My Events </Button>{' '}
                    <Button className= 'log-out' outline color="danger" onClick={logoutHandler}> Logout </Button>


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
                        <Button color="primary" className="Sub" onClick={() => registrationRequestHandler(event)}> Subscribe</Button> 

                    </li>
                ))} 
            </ul>
            {
                error ? (
                    <Alert className="event-validation" color="danger"> {messageHandler} </Alert>
                ) : ""
            }
            {
                success ? (
                    <Alert className="event-validation" color="success"> {messageHandler}</Alert>
                ) : ""
            }   
        </>
    )

}

