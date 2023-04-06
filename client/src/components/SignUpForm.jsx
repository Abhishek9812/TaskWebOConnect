import React, {useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from "react-toastify";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignupForm = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    // const [status, setStatus] = useState('pending');
    const [phone, setPhone] = useState();
    const [age, setAge] = useState('');


    const handleInputChange = (event, setState, regex) => {
        if (regex.test(event.target.value) || event.target.value === '') {
            setState(event.target.value);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Password and confirm password should be same", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        if(phone.length !== 10){
            toast.error("Please Fill Correct Phone Number", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
        let data = { name, email, phone,gender, password, status:"pending", dob, age };
        await axios.post('http://localhost:5000/createUser', data)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('User Register Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    history.push('/');
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
                        Name:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(event) => handleInputChange(event, setName,/^[a-zA-Z]+$/)}
                            required
                        />
                    </Col>
                </Row>
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
                        Gender:
                    </Form.Label>
                    <Col sm="2">
                        <Form.Check inline label="Male" type="radio" value="male" checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)} name="gender" />
                        <Form.Check inline label="Female" type="radio" checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)} value="female" name="gender" />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Date of Birth:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="date"
                            placeholder="Enter Date of Birth"
                            value={dob}
                            onChange={(e) => {
                                setDob(e.target.value);
                                const ageDiffMs = Date.now() - new Date(e.target.value).getTime();
                                const ageDate = new Date(ageDiffMs);
                                setAge(Math.abs(ageDate.getUTCFullYear() - 1970));
                            }}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Age:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="number"
                            placeholder="Enter Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            disabled
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Phone:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="tel"
                            placeholder="Enter mobile number"
                            value={phone}
                            onChange={(e)=>handleInputChange(e, setPhone, /^[0-9\b]{0,10}$/)}
                            maxLength="10"
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
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Label column sm="3">
                        Confirm Password:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            required
                        />
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p className="mt-2" style={{cursor:"pointer"}} onClick={e=>history.push('/login')}>already have an account?</p>
            </Form>
        </Container>
    );
};

export default SignupForm;