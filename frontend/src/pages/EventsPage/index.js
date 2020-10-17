import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input, Label, Alert, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import cameraIcon from '../../assets/camera.png'
import "./events.css";

export default function EventsPage({history}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [sport, setSport] = useState('Sport')
    const [date, setDate] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    const user = localStorage.getItem('user');

    useEffect(() => {
        if(!user) {
            history.push("/login")
        }
    }, [])


    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])


    console.log(title, description, price, sport)

    const submitHandler = async (evt) => {
        evt.preventDefault()

        const eventData = new FormData();
        


        eventData.append("thumbnail", thumbnail)
        eventData.append("sport", sport)
        eventData.append("title", title)
        eventData.append("price", price)
        eventData.append("description", description)
        eventData.append("date", date)


        try {
            if (title !== "" &&
                description !== "" &&
                price !== "" &&
                sport !== "Sport" &&
                date !== "" &&
                thumbnail !== null
            ) {
                await api.post("/event", eventData, { headers: { user} })

                setSuccessMessage(true)
                setTimeout(() => {
                    setSuccessMessage(false)
                    history.push("/")
                }, 2000)

            } else {
                setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 2000)
            }
        } catch (error) {
            Promise.reject(error);
            console.log(error);
        }
    }

    const sportsEventHandler = (sport) => setSport(sport)

    return (
        <Container>
            <h2>Create your Event</h2>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label>Upload Image: </Label>
                    <Label id='thumbnail' style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                        <Input type="file" onChange={evt => setThumbnail(evt.target.files[0])} />
                        <img src={cameraIcon} style={{ maxWidth: "50px" }} alt="" />
                    </Label>
                </FormGroup>
                <FormGroup>
                
                <FormGroup>
                    <Label>Title: </Label>
                    <Input id="title" type="text" value={title} placeholder={'Event Title'} onChange={(evt) => setTitle(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event description: </Label>
                    <Input id="description" type="text" value={description} placeholder={'Event Description'} onChange={(evt) => setDescription(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event price: </Label>
                    <Input id="price" type="text" value={price} placeholder={'Event Price in dollars'} onChange={(evt) => setPrice(evt.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Event date: </Label>
                    <Input id="date" type="date" value={date} placeholder={'Event Date'} onChange={(evt) => setDate(evt.target.value)} />
                </FormGroup>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret color="info" value={sport}> {sport} </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => sportsEventHandler('Running')}>Running</DropdownItem>
                                <DropdownItem onClick={() => sportsEventHandler('Swimming')}> Swimming</DropdownItem>
                                <DropdownItem onClick={() => sportsEventHandler('Cycling')}>Cycling</DropdownItem>
                                <DropdownItem onClick={() => sportsEventHandler('Hiking')}>Hiking</DropdownItem>
                            </DropdownMenu>
                    </ButtonDropdown>
                </FormGroup>
                <Button type="submit" className='submit-btn'>
                    Create Event
                </Button>
                <Button className='secondary-btn' onClick={() => history.push("/")}>
                    Cancel
                </Button>
            </Form>

            {errorMessage ? (
                <Alert className="event-validation" color="danger"> Missing required information</Alert>
            ) : ""}
            {successMessage ? (
                <Alert className="event-validation" color="success"> Event created. Congratulations!</Alert>
            ) : ""}
        </Container>
    )
}