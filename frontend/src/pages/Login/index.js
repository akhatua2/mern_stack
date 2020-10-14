import React, {useState} from 'react';
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import "./login.css";

export default function Login({history}) {
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [errors, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)


    const handleSubmit = async evt => {
        evt.preventDefault();
        const response = await api.post('/login', {email, password})
        const user_id = response.data.user_id || false;
        const user = response.data.user || false;

        try {
            if(user && user_id) {
                localStorage.setItem('user', user)
                localStorage.setItem('user_id', user_id)

                history.push('/')
            } else {
                const {message} = response.data

                setError(true)
                setErrorMessage(message)
                setTimeout(() => {
                    setErrorMessage(false)
                    setErrorMessage("")
                }, 2000)
                console.log(errors)
            }
            
        } catch (error) {
            Promise.reject(error);
            console.log(error);
        }
    }

    return(
        <Container>
            <h2> Login </h2>
            <p> Please <strong>login</strong> to access your account!</p>
            <Form onSubmit = {handleSubmit}>
                <FormGroup className="textField">
                    <Label>Email Address: </Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Your email" onChange={evt => setEmail(evt.target.value)}/>
                </FormGroup>


                <FormGroup className="textField">
                    <Label>Password: </Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Your password" onChange={evt => setPassword(evt.target.value)}/>
                </FormGroup>
  
                <Button className='submit-btn'>Submit</Button>

                <FormGroup>
                    <Button className='secondary-btn' onClick={() => history.push("/register")}>Register</Button>
                </FormGroup>

                {errorMessage ? (
                    <Alert className="event-validation" color="danger"> {errorMessage} </Alert>
                ) : ""}
            </Form>
        </Container>
    )
}