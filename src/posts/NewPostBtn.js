import React from 'react';
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

const NewPostBtn = () => {
    <Col>
        <Form>
            <Button theme="accent">Create new post</Button>
        </Form>
    </Col>
}

export default NewPostBtn;