import React, {useState} from 'react';
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import "./login.css";

export default function Login({history}) {
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)


    const handleSubmit = async evt => {
        evt.preventDefault();
        const response = await api.post('/login', {email, password})
        const userId = response.data._id || false;

        try {
            if(userId) {
                localStorage.setItem('user', userId)
                history.push('/')
            } else {
                const {message} = response.data

                setError(true)
                setErrorMessage(message)
                setTimeout(() => {
                    setErrorMessage(false)
                    setErrorMessage("")
                }, 2000)
                console.log(message)
            }
            
        } catch (error) {
            
        }
    }

    return(
        <Container>
            <h2> Login </h2>
            <p> Please <strong>login</strong> to access your account!</p>
            <Form onSubmit = {handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>Email Address: </Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Your email" onChange={evt => setEmail(evt.target.value)}/>
                </FormGroup>
                <br/>

                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>Password: </Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Your password" onChange={evt => setPassword(evt.target.value)}/>
                </FormGroup>
                <br/>
                <FormGroup>
                    <Button>Submit</Button>
                </FormGroup>

                {errorMessage ? (
                    <Alert className="event-validation" color="danger">  </Alert>
                ) : ""}
            </Form>
        </Container>
    )
}