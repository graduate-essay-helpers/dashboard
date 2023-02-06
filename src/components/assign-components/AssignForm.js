import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextarea,
    DatePicker,
    Button
} from "shards-react";
import { useLocation } from 'react-router-dom';

const AssignForm = () => {

    const location = useLocation();

    const [orderAssign, setOrderAssign] = useState({
        title: location.state.rowIndex[0].title,
        assigned_to: '',
        priority: '',
        assign_date: '',
        notes: '',
        wrt_id: '',
    });

    // ==================================================

    const onChangeValue = (e) => {
        setOrderAssign({
            ...orderAssign,
            [e.target.name]: e.target.value
        });
    }

    // ==================================================

    useEffect(() => {
        window.scrollTo(0, 0);
        allwriters();
    }, []);

    const [iswriter, setwriter] = useState([]);
    const allwriters = async (ids) => {
        try {
            // axios.get(`http://localhost:8000/essay-helpers/api/assignwriter.php`)
            axios.get(`https://graduate-essay-helpers.com/api/assignwriter.php`)
                .then(res => {
                    console.log(res.data.writerslist.writerdata)
                    setwriter(res.data.writerslist.writerdata);
                })
        } catch (error) { throw error; }
    };

    // =================================================


    const [selected, setSelected] = useState(-1);

    const value = selected !== -1 && iswriter[selected];

    const submitAssignedOrder = async (event) => {
        try {
            event.preventDefault();
            event.persist();
            // axios.post(`http://localhost:8000/essay-helpers/api/updateassigning.php`,
            axios.post(`https://graduate-essay-helpers.com/api/updateassigning.php`,
                {
                    title: orderAssign.title,
                    assigned_to: value.name,
                    priority: orderAssign.priority,
                    assign_date: orderAssign.assign_date,
                    notes: orderAssign.notes,
                    wrt_id: value.id,
                    ord_id: location.state.rowIndex[0].id,
                })
                .then(res => {
                    console.log(res.data);
                    alert(`Task assigned to ${value.name} successfully`);
                    window.location = "/orders"
                    return;
                })
        } catch (error) { throw error; }
    };



    console.log(iswriter);
    console.log(location);
    console.log(selected);
    console.log(value);
    console.log(orderAssign);

    return (
        <>
            {location.state.rowIndex[0].order_status === "DELIVERED" ?
                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Delivered</h6>
                    </CardHeader>
                    <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Row>
                                <Col>
                                    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <h3 style={{ rotate: "-45deg", position: "relative", fontSize: "3rem", fontWeight: "500", objectFit: "contain" }}>DELIVERED</h3>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
                :
                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Assignment Form</h6>
                    </CardHeader>
                    <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Row>
                                <Col>
                                    <Form className="insertForm" onSubmit={submitAssignedOrder}>
                                        <FormGroup>
                                            <label htmlFor='title'>Title</label>
                                            <FormInput
                                                id="title"
                                                name="title"
                                                placeholder="Task title"
                                                value={orderAssign.title}
                                                onChange={onChangeValue}
                                                style={{ fontWeight: '500', fontSize: '0.9rem', color: 'black' }}
                                            ></FormInput>
                                        </FormGroup>
                                        <FormGroup>
                                            <label htmlFor="assign">Assigned to:</label>
                                            <FormSelect
                                                style={{ fontWeight: '500', color: 'black' }}
                                                name="assigned_to"
                                                id="assigned_to"
                                                onChange={(e) => {
                                                    setSelected(e.target.value);
                                                    setOrderAssign({
                                                        ...orderAssign,
                                                        [e.target.name]: e.target.value
                                                    });
                                                }}
                                                value={selected}
                                            // onChangeValue={onChangeValue}
                                            // size="md"
                                            >
                                                <option value="first">Select ---</option>
                                                {iswriter.map((writer, index) => (
                                                    <>
                                                        <option
                                                            key={writer.id}
                                                            value={index}
                                                        >{writer.name}</option>
                                                    </>
                                                ))}

                                            </FormSelect>
                                        </FormGroup>
                                        {value &&

                                            <FormInput
                                                id="wrt_id"
                                                name="wrt_id"
                                                placeholder="writer id"
                                                value={value.id}
                                                onChange={onChangeValue}
                                                style={{ fontWeight: '500', fontSize: '0.9rem', color: 'black' }}
                                            ></FormInput>
                                        }
                                        <FormGroup>
                                            <label htmlFor="priority">Task priority:</label>
                                            <FormSelect
                                                style={{ fontWeight: '500', color: 'black' }}
                                                name="priority"
                                                id="priority"
                                                // value={orderAssign.priority}
                                                onChange={onChangeValue}
                                            // size="md"
                                            >
                                                {/* <option value="first">Select ---</option> */}
                                                <option value="High">High</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Low">Low</option>
                                            </FormSelect>
                                        </FormGroup>
                                        <Row>
                                            <Col>
                                                <FormGroup>
                                                    <label htmlFor="start_date">Start date: </label>
                                                    <FormInput
                                                        name="assign_date"
                                                        id="start_date"
                                                        type="date"
                                                        onChange={onChangeValue}
                                                    ></FormInput>
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <label htmlFor="due_date">Due date: </label>
                                                    <FormInput
                                                        type="date"
                                                        name="due_date"
                                                        id="due_date"
                                                        // placeholder="due date"
                                                        onChange={onChangeValue}
                                                    // value={orderAssign.assigned_to}
                                                    ></FormInput>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" className="form-group">
                                                <label htmlFor="notes">Notes</label>
                                                <FormTextarea id="notes" name="notes" rows="4" onChange={onChangeValue} style={{ fontWeight: '500', fontSize: '1rem', color: 'black' }} />
                                            </Col>
                                        </Row>
                                        <Button
                                            type="submit" theme="accent" value="update"
                                            style={{ fontWeight: '500', fontSize: '0.9rem' }}
                                        >Save</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            }
        </>
    )
}

export default AssignForm