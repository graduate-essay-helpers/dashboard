import React from "react";
import PropTypes from "prop-types";
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

const GenCoupon = ({ title }) => (
    <Card small className="mb-4">
        <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
        </CardHeader>
        <ListGroup flush>
            <ListGroupItem className="p-3">
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <label htmlFor="stName">Generate coupon</label>
                                <FormInput
                                    id="stName"
                                    placeholder="generate coupon"
                                    value=""
                                    onChange={() => { }}
                                />
                            </FormGroup>
                            <Button theme="accent">Generate</Button>
                            <br />
                            <br />
                            <FormGroup>
                                <label htmlFor="phone">Discount</label>
                                <FormInput
                                    id="phone"
                                    // type="number"
                                    placeholder="discount"
                                    value=""
                                    onChange={() => { }}
                                />
                            </FormGroup>

                            <Button theme="accent">Save</Button>
                        </Form>
                    </Col>
                </Row>
            </ListGroupItem>
        </ListGroup>
    </Card>
);

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
