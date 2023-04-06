import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormControl, InputGroup, Col, Row, Modal, Container } from 'react-bootstrap';
import axios from "axios";
import { FaCircle } from 'react-icons/fa';
import { toast } from "react-toastify";


const Home = () => {
    const history = useHistory();
    const [editable, setEditable] = useState(false);
    const [userData, setUserData] = useState("");
    const [userDataOld, setUserDataOld] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => setShowModal(!showModal);

    const handleEdit = () => setEditable(true);

    const handleSave = async () => {
        setEditable(false);
        if (userData === userDataOld) {
            return;
        }
        await axios.patch('http://localhost:5000/update', userData)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Updated Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setUserDataOld(userData);
                    // setUserData(res.data);
                } else {
                    toast.error("Something went wrong", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setUserData(userDataOld);
                }
            }).catch((err) => {
                toast.error("Something went wrong", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setUserData(userDataOld);
                console.log(err);
            })
    }

    const handleCancel = () => {
        setEditable(false);
        setUserData(userDataOld);
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }


    const DeleteAccount = async () => {
        const data = { _id: userData._id };
        await axios.post("http://localhost:5000/deleteAccount", data)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Deleted Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    localStorage.clear();
                    console.log(res);
                    history.push('/signUp');
                } else {
                    toast.error("Something went wrong", {
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
                toast.error("Something went wrong", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(err);
            })
    }

    const getUser = async () => {
        let data = { id: localStorage.getItem('userId') };
        await axios.post("http://localhost:5000/getUser", data)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    setUserDataOld(res.data);
                    setUserData(res.data);
                } else {
                    history.push('/login');
                }
            }).catch((err) => {
                console.log(err);
                history.push('/signUp');
            })
    }

    const handleLogout = async () => {
        await axios.post('http://localhost:5000/logout',userData)
            .then((res)=>{
                console.log(res);
            }).catch((err)=> console.log(err));
        localStorage.clear();
        history.push('/signUp')
    }

    useEffect(() => {
        let data = localStorage.getItem('userId');
        if (data) {
            getUser();
        } else {
            history.push('/signUp');
        }
    }, [])


    return (
        <>
            <Container className='mt-5'>
                <Row className='d-flex flex-row-reverse' >
                    <div>
                    <FaCircle color={userData?.status ==='active' ? "green" : "orange"} />
                        <span>{userData.name}</span>
                    </div>
                    <Button className="m-3" variant="danger" type="submit" onClick={() => handleModalToggle()} >
                        Delete Account
                    </Button>
                    <Button className="m-3" variant="warning" type="submit" onClick={() => { handleLogout() }} >
                        Logout
                    </Button>
                    <Button className="m-3" variant="primary" type="submit" onClick={() => handleEdit()} >
                        Update
                    </Button>
                </Row>

                <Form>
                    <Row className="mb-3">
                        <Form.Label column sm="3">
                            Name:
                        </Form.Label>
                        <Col sm="9">
                            {editable ? (
                                <FormControl
                                    type="text"
                                    name='name'
                                    value={userData.name}
                                    onChange={(e) => handleChange(e)}
                                />
                            ) : (
                                <InputGroup>
                                    <FormControl type="text" value={userData.name} readOnly />
                                </InputGroup>
                            )}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label column sm="3">
                            Email:
                        </Form.Label>
                        <Col sm="9">
                            {editable ? (
                                <FormControl
                                    type="email"
                                    name='email'
                                    value={userData.email}
                                    onChange={(e) => handleChange(e)}
                                />
                            ) : (
                                <InputGroup>
                                    <FormControl type="email" value={userData.email} readOnly />
                                </InputGroup>
                            )}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label column sm="3">
                            Phone:
                        </Form.Label>
                        <Col sm="9">
                            {editable ? (
                                <FormControl
                                    type="tel"
                                    name='phone'
                                    value={userData.phone}
                                    onChange={(e) => handleChange(e)}
                                />
                            ) : (
                                <InputGroup>
                                    <FormControl type="tel" value={userData.phone} readOnly />
                                </InputGroup>
                            )}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label column sm="3">
                            Password:
                        </Form.Label>
                        <Col sm="9">
                            {editable ? (
                                <FormControl
                                    type="text"
                                    name='password'
                                    value={userData.password}
                                    onChange={(e) => handleChange(e)}
                                />
                            ) : (
                                <InputGroup>
                                    <FormControl type="password" value={userData.password} readOnly />
                                </InputGroup>
                            )}
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label column sm="3">
                            Date of Birth:
                        </Form.Label>
                        <Col sm="9">
                            {editable ? (
                                <Form.Control
                                    type="date"
                                    value={userData.dob}
                                    placeholder="Enter Date of Birth"
                                    onChange={(e) => {
                                        setUserData({
                                            ...userData,
                                            ['dob']: e.target.value,
                                            ['age']: Math.abs(new Date(Date.now() - new Date(e.target.value).getTime()).getUTCFullYear() - 1970)
                                        });
                                    }}
                                />
                            ) : (
                                <InputGroup>
                                    <FormControl type="date" value={userData.dob} readOnly />
                                </InputGroup>
                            )}

                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label column sm="3">
                            Age:
                        </Form.Label>
                        <Col sm="9">
                            <FormControl type="number" value={userData.age} readOnly />
                        </Col>
                    </Row>

                </Form>

                {editable && (
                    <div className="edit-buttons">
                        <Button className="m-3" variant="success" onClick={handleSave}>
                            Save
                        </Button>
                        <Button className="m-3" variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                )}

                <Modal show={showModal} onHide={handleModalToggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to Delete Accont?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalToggle}>
                            No
                        </Button>
                        <Button variant="primary" onClick={DeleteAccount}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>


        </>
    )
}

export default Home;