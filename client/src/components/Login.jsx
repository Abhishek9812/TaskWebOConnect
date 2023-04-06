import React, {useState } from "react";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from "react-toastify";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { email, password };
        await axios.post('http://localhost:5000/login', data)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Login Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    localStorage.setItem('userId',res.data._id);
                    history.push('/',{ data: res.data });
                    e.target.reset();
                } else {
                    toast.error(res.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
    };

    return (
        <Container className='mt-5'>
            <Form onSubmit={e => handleSubmit(e)}>
                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Email:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Password:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p className="mt-2" style={{cursor:"pointer"}} onClick={e=>history.push('/signUp')}>new user registration</p>
            </Form>
        </Container>
    )
}

export default Login;