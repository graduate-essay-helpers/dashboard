import React, { useEffect, useState, useRef } from 'react';
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
    FormCheckbox,
    Button
} from "shards-react";

const OpenForm = (props) => {


    useEffect(() => {
        window.scrollTo(0, 0);
        allorders();
    }, []);

    console.log(props)

    const [isorder, setOrder] = useState([]);
    const allorders = async (ids) => {
        try {
            axios.get(`http://localhost:8000/essay-helpers/api/getorders.php`)
                // axios.get(`https://graduate-essay-helpers.com/api/getorders.php`)
                .then(res => {
                    console.log(res.data.orderlist.orderdata)
                    setOrder(res.data.orderlist.orderdata);
                })
        } catch (error) { throw error; }
    };

    // console.log(isorder)

    // ========================================================

    const [selected, setSelected] = useState(-1);

    const value = selected !== -1 && isorder[selected];

    const ttlRef = useRef();

    console.log(ttlRef);

    const [orderId, setOrderId] = useState([]);

    // =============================================================

    const [getTitle, setGetTitle] = useState({
        title: value.title,
        order_id: "",
        user_id: "",
    });

    const onChangeValue = (e) => {
        // setSelected(e.target.value)
        setGetTitle({
            ...getTitle,
            [e.target.name]: e.target.value
        });
    }


    console.log(getTitle);

    // ====================================================================

    const submitForm = async (e) => {
        try {
            e.preventDefault();
            e.persist();

            axios.post(`http://localhost:8000/essay-helpers/api/gettitle.php`, {
                order_id: value.id,
                user_id: value.user_id,
                title: getTitle.title,
            })
                .then(res => {
                    console.log(res.data);
                    setGetTitle(res.data.orderlist.orderdata);
                    ttlRef.current = res.data.orderlist.orderdata;

                    const id = ttlRef.current[0].id
                    console.log(id);
                    console.log(orderId);
                    console.log(props);

                    setOrderId(id);
                    // props.history.push({pathname: "/assign/", search: "?id=" + id, state: { rowIndex: res[0].data.orderlist.orderdata }})
                    // alert("Coupon created and assigned to client successfully!");
                    // { res.data.sucess = "false" ? console.log("title not selected") : window.location = "/orders" }
                    return;
                })

        } catch (error) { throw error; }
    };

    console.log(getTitle);


    return (
        <Card small className="mb-4">
            <CardHeader className="border-bottom">
                <h6 className='m-0'>Send Order</h6>
            </CardHeader>
            <ListGroup flush>
                <ListGroupItem className="p-3">
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <label htmlFor='title'><b>Document Title: </b></label>
                            {/* <Row> */}
                            <Col lg="8">
                                <FormSelect
                                    name="title"
                                    id="title"
                                    style={{ fontWeight: '500', fontSize: '1.2rem', color: 'black' }}
                                    size="lg"
                                    onChange={(e) => {
                                        setSelected(e.target.value);
                                        setGetTitle({
                                            ...getTitle,
                                            [e.target.name]: e.target.value
                                        });
                                    }}
                                    value={selected}
                                >
                                    <option value="select">Select ---</option>

                                    {isorder.map((order, index) => (
                                        <>
                                            <option
                                                key={order.id}
                                                value={index}
                                            >{order.title}</option>
                                        </>
                                    ))}
                                </FormSelect>
                            </Col>
                            {/* </Row> */}
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col lg="5">
                                    {value &&
                                        <>
                                            <label htmlFor='order_id'><b>Order id: </b></label>
                                            <FormInput
                                                name="order_id"
                                                id="order_id"
                                                disabled
                                                value={value.id}
                                                onChange={onChangeValue}
                                                style={{ fontWeight: '500', fontSize: '1rem', color: 'black' }}
                                            ></FormInput>
                                        </>
                                    }
                                </Col>
                                <Col lg="5">
                                    {value &&
                                        <>
                                            <label htmlFor='user_id'><b>User id: </b></label>
                                            <FormInput
                                                name="user_id"
                                                id="user_id"
                                                disabled
                                                value={value.user_id}
                                                onChange={onChangeValue}
                                                style={{ fontWeight: '500', fontSize: '1rem', color: 'black' }}
                                            ></FormInput>
                                        </>
                                    }
                                </Col>
                            </Row>
                        </FormGroup>

                        <Button
                            type="submit" theme="accent" value="send"
                            style={{ fontWeight: '500', fontSize: '0.9rem' }}
                        >Open</Button>
                    </Form>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default OpenForm