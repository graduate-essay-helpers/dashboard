import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
    Button
} from "shards-react";
import result from "autoprefixer/data/prefixes";

const GenCoupon = ({ title }) => {


    const [genCoupon, setgenCoupon] = useState();
    const [selected, setSelected] = useState(-1);

    const handleChange = event => {
        setgenCoupon(event.target.value);
        setInsertCoupon({
            ...insertCoupon,
            [event.target.name]: event.target.value
        });
    };

    console.log(selected);


    // ===========================================


    const generate = event => {
        event.preventDefault();

        try {
            // axios.get(`http://localhost:8000/essay-helpers/api/gencoupon.php`)
            axios.get(`https://graduate-essay-helpers.com/api/gencoupon.php`)
                .then(res => {
                    console.log(res.data);
                    setgenCoupon(res.data.coupondata.coupon_code);
                })
        } catch (error) { throw error; }


    }

    // =======================================================

    useEffect(() => {
        window.scrollTo(0, 0);
        alluser();
    }, []);

    const [isuser, setuser] = useState([]);
    const alluser = async (ids) => {
        try {
            // axios.get(`http://localhost:8000/essay-helpers/api/getusers.php`)
            axios.get(`https://graduate-essay-helpers.com/api/getusers.php`)
                .then(res => {
                    console.log(res.data.userlist.userdata)
                    setuser(res.data.userlist.userdata);
                })
        } catch (error) { throw error; }
    };

    // ================================================


    const value = selected !== -1 && isuser[selected];

    // =============================================

    const [insertCoupon, setInsertCoupon] = useState({
        gen_coupon: "",
        discount: "",
        offer_to: "",
        user_id: "",
        expiration_date: "",
    });

    console.log(genCoupon);

    const onChangeValue = (e) => {
        setInsertCoupon({
            ...insertCoupon,
            [e.target.name]: e.target.value
        });
    }

    const submitCoupon = async (event) => {
        try {
            event.preventDefault();
            event.persist();

            // axios.post(`http://localhost:8000/essay-helpers/api/createcoupon.php`,
            axios.post(`https://graduate-essay-helpers.com/api/createcoupon.php`,
                {
                    gen_coupon: genCoupon,
                    discount: insertCoupon.discount,
                    offer_to: value.email,
                    user_id: value.id,
                    expiration_date: insertCoupon.expiration_date,
                })
                .then(res => {
                    console.log(res.data);
                    alert("Coupon created and assigned to client successfully!");
                    return;
                })
        } catch (error) { throw error; }
    };

    // function generate(length) {
    //     var result = '';
    //     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
    //     var charactersLength = characters.length;
    //     for (var i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() *
    //             charactersLength));
    //     }
    //     return result;
    // }

    // const [count, setCount] = useState(0);

    // function test() {
    //     setCount(1);
    //     console.log(toString(setCount(1)));
    //     console.log('test');
    // }

    return (
        <Card small className="mb-4">
            <CardHeader className="border-bottom">
                <h6 className="m-0">{title}</h6>
            </CardHeader>
            <ListGroup flush>
                <ListGroupItem className="p-3">
                    <Row>
                        <Col>
                            <Form onSubmit={submitCoupon}>
                                <FormGroup>
                                    <label htmlFor="stName">Generate coupon</label>
                                    <FormInput
                                        id="stName"
                                        name="gen_coupon"
                                        placeholder="generate coupon"
                                        value={genCoupon}
                                        onChange={handleChange}
                                        style={{ fontWeight: '500', fontStyle: 'bold', color: 'black' }}
                                    />
                                </FormGroup>
                                <Button
                                    theme="accent"
                                    name="cpn_btn"
                                    //   value={generate(20)}
                                    //    onClick={e => console.log(e.target.value)}
                                    onClick={generate}
                                >Generate</Button>
                                <br />
                                <br />
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            <label htmlFor="discount">Discount:</label>
                                            <FormInput
                                                id="discount"
                                                name="discount"
                                                type="number"
                                                placeholder="discount ($)"
                                                // value=""
                                                onChange={onChangeValue}
                                                style={{ fontWeight: '500', color: 'black' }}
                                            /></Col>
                                        <Col>
                                            <label htmlFor="expiration_date">Expiration Date:</label>
                                            <FormInput
                                                id="expiration_date"
                                                name="expiration_date"
                                                type="date"
                                                placeholder="expiry date"
                                                // value=""
                                                onChange={onChangeValue}
                                                style={{ fontWeight: '500', color: 'black' }}
                                            /></Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            <label htmlFor="assign">Offer to:</label>
                                            <FormSelect
                                                style={{ fontWeight: '500', color: 'black' }}
                                                name="offer_to"
                                                id="offer_to"
                                                onChange={(e) => {
                                                    setSelected(e.target.value);
                                                    setInsertCoupon({
                                                        ...insertCoupon,
                                                        [e.target.name]: e.target.value
                                                    });
                                                }}
                                                value={selected}
                                            // onChangeValue={onChangeValue}
                                            // size="md"
                                            >
                                                <option value="first">Select ---</option>
                                                {isuser.map((user, index) => (
                                                    <>
                                                        <option
                                                            key={user.id}
                                                            value={index}
                                                        >{user.email}</option>
                                                    </>
                                                ))}

                                            </FormSelect>

                                        </Col>
                                        <Col>
                                            {value &&
                                                <>

                                                    <label htmlFor="assign">User id:</label>
                                                    <FormInput
                                                        id="user_id"
                                                        name="user_id"
                                                        placeholder="writer id"
                                                        value={value.id}
                                                        onChange={onChangeValue}
                                                        style={{ fontWeight: '500', fontSize: '0.9rem', color: 'black' }}
                                                    ></FormInput></>

                                            }</Col>
                                    </Row>
                                </FormGroup>

                                <Button theme="accent">Save</Button>
                            </Form>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    );

}

GenCoupon.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string
};

GenCoupon.defaultProps = {
    title: "Details"
};

export default GenCoupon;
