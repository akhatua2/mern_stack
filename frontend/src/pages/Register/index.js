import React, {useState} from 'react';
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';


export default function Register({history}) {
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ firstName, setFirstName] = useState("")
    const [ lastName, setLastName] = useState("")
    const [errors, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)


    const handleSubmit = async evt => {
        evt.preventDefault();

        
        try {
            if(email !== "" && password !== "" && firstName !== "" && lastName !== "") {
                const response = await api.post('/user/register', {email, password, firstName, lastName})
                const user = response.data.user || false;
                const user_id = response.data.user_id || false;
                if(user && user_id) {
                    history.push('/login')
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
            } else {

                setError(true)
                        setErrorMessage("Please fill out all the details")
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
            <h2>Register</h2>
            <p>Please <strong>create</strong> a new account</p>
            <Form onSubmit = {handleSubmit}>

                <FormGroup className="textField">
                    <Label>First Name: </Label>
                    <Input type="text" name="firstName" id="firstName" placeholder="Your first name" onChange={evt => setFirstName(evt.target.value)}/>
                </FormGroup>



                <FormGroup className="textField">
                    <Label>Last Name: </Label>
                    <Input type="text" name="lastName" id="lastName" placeholder="Your last name" onChange={evt => setLastName(evt.target.value)}/>
                </FormGroup>                


                <FormGroup className="textField">
                    <Label>Email Address: </Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Your email" onChange={evt => setEmail(evt.target.value)}/>
                </FormGroup>



                <FormGroup className="textField">
                    <Label>Passwoard: </Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Your password" onChange={evt => setPassword(evt.target.value)}/>
                </FormGroup>
                

                <Button className='submit-btn'>Submit</Button>
                <FormGroup>
                    <Button className='secondary-btn' onClick={() => history.push("/login")}>Login</Button>
                </FormGroup>

                {errorMessage ? (
                    <Alert className="event-validation" color="danger"> {errorMessage} </Alert>
                ) : ""}
            </Form>
        </Container>
    )
}