import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams, useLocation } from 'react-router-dom';
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
} from 'shards-react';

const Details = (props) => {

    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.search); // result: '?query=abc'
        console.log(location.state); // result: 'some_value'
    }, [location]);

    console.log(location.state);

    if (location.state.files) {
        console.log("files exist");
    } else {
        console.log("no files");
    }

    const myId = location.search.split("?id=");

    // console.log(myId[1]);

    const id = myId[1];


    useEffect(() => {
        window.scrollTo(0, 0);
        alluser();
    }, []);

    const [isuser, setuser] = useState([]);
    const alluser = async (ids) => {
        // try {
        //     axios.get(`http://localhost:8000/essay-helpers/api/getorder.php`, {
        //         ord_id: id,
        //     })
        //         // axios.get(`https://graduate-essay-helpers.com/api/getorders.php`)
        //         .then(res => {
        //             console.log(res.data.orderlist.orderdata)
        //             setuser(res.data.orderlist.orderdata);
        //         })
        // } catch (error) { throw error; }
    };



    return (
        <>
            <Card>
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Order/Task Details</h6>
                </CardHeader>
                <ListGroup flush>
                    <ListGroupItem className="p-3">
                        <Row>
                            <Col>
                                <h5>Order id: <b>#{location.state.rowIndex[0].id}</b></h5>
                                <h5>Academic level: <b>{location.state.rowIndex[0].academic_level}</b></h5>
                                <h5>Type of paper: <b>{location.state.rowIndex[0].type_of_paper}</b></h5>
                                <h5>Subject area: <b>{location.state.rowIndex[0].subject_area}</b></h5>
                                <h5>Title: <b>{location.state.rowIndex[0].title}</b></h5>
                                <h5>Deadline: <b>{location.state.rowIndex[0].deadline}</b></h5>
                                <h5>No of pages: <b>{location.state.rowIndex[0].pages}</b></h5>
                                <h5>File(s): <Col>
                                    <Col>
                                        <b>{
                                            location.state.files
                                                ?
                                                location.state.files.map((file, index) => (
                                                    <>
                                                        {/* <a href={`http://localhost:8000/essay-helpers/${file.file}`} download target="_blank">{file.file.split("uploads/")}</a><br /> */}
                                                        <a href={`https://graduate-essay-helpers.com/${file.file}`} download target="_blank">{file.file.split("uploads/")}</a><br />
                                                    </>
                                                ))
                                                :
                                                <><p>no files</p></>
                                        }</b>
                                    </Col></Col>
                                </h5>
                                <h5>Instructions: <b>{(location.state.rowIndex[0].instructions).slice((1, 3), (-1, -4))}</b></h5>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </>
    )
}

export default Details