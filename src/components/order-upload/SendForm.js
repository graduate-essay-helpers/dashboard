import React, { useEffect, useState } from 'react';
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
// import UploadFiles from './UploadFiles (waste)';
// import FileUpload from './UploadFiles';
import UploadFiles from './UploadFiles(remove)';
import { useLocation } from 'react-router-dom';
import FileUpl from './FileUpl';

import Sent from './Sent';

const SendForm = () => {

    const location = useLocation();

    // ============================================================

    const [fileUrl, setFileUrl] = useState({});
    const [fileInfo, setFileInfo] = useState({});

    function uploadFile(e) {
        var file = e.target.files[0] //the file
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
            var rawLog = reader.result.split(',')[1]; //extract only thee file data part
            var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
            fetch('https://script.google.com/macros/s/AKfycbxrJ9OhkB7n0QdO3hPAbyuQbFJ6f9Hv2C5AK--5kcCwGqP0dilfzKyj8vK6aoK1dQOO/exec', //your AppsScript URL
                { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
                .then(res => res.json()).then((a) => {
                    console.log(a) //See response
                    console.log(file)
                    setFileUrl(a);
                    setFileInfo(file);
                }).catch(e => console.log(e)) // Or Error in console
        }
    }


    //   ===================================================================

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
                    return dev;
                })
        } catch (error) { throw error; }
    };

    console.log(isuser);

    // ===========================================

    const [selected, setSelected] = useState(-1);

    const value = selected !== -1 && isuser[selected];

    const [state, setState] = useState({ conf_upload: false });

    const [allData, setAllData] = useState({});

    // ===============================================

    const [sendDoc, setSendDoc] = useState({
        name: "",
        email: "",
        user_id: "",
        conf_upload: false,
        message: "",
        file_url: "",
    });

    // ===================================================


    const onChangeValue = (e) => {
        setSendDoc({
            ...sendDoc,
            [e.target.name]: e.target.value
        });
    }

    // ====================================================

    const submitForm = async (event) => {

        const dtArr = {
            name: value.name,
            email: value.email,
            user_id: value.id,
            title: location.state.getData[0].title,
            message: sendDoc.message,
            ord_id: location.state.getData[0].id,
            conf_upload: sendDoc.conf_upload.toString(),
            file_url: fileUrl.url,
            file_name: fileInfo.name,
            file_type: fileInfo.type,
            file_size: fileInfo.size,
        }

        let one = "http://localhost:8000/essay-helpers/api/updateorder.php";
        let two = "http://localhost:8000/essay-helpers/api/insertdeliver.php";
        let three = "http://localhost:8000/essay-helpers/api/insertblog.php";
        let four = "http://localhost:8000/essay-helpers/api/getblog.php";
        let five = "http://localhost:8000/essay-helpers/api/getdelivered.php";

        const requestOne = axios.post(one, dtArr);
        const requestTwo = axios.post(two, dtArr);
        const requestThree = axios.post(three, dtArr);
        const requestFour = axios.post(four, dtArr);
        const requestFive = axios.post(five, dtArr);

        try {
            event.preventDefault();
            event.persist();
            axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive])
                .then(axios.spread((...res) => {
                    const resOne = res[0]
                    const resTwo = res[1]
                    const resThree = res[2]
                    const resFour = res[3]
                    const resFive = res[4]
                    console.log(resOne);
                    console.log(resTwo);
                    console.log(resThree);
                    console.log(resFour);
                    console.log(resFive);
                    console.log(res);
                    console.log(dtArr);
                    if (res[0].data.success == true && res[1].data.success == true) {
                        setAllData(res);
                        alert(`Finished document sent to ${value.name} successfully`);
                    }
                    return;
                }))
        } catch (error) { throw error; }

        console.log(dtArr);
    }

    console.log(allData);
    console.log(fileInfo);
    console.log(location);
    console.log(selected);

    // =====================================================================


    // };

    const uploaded = "yes";

    return (
        <>
            <>
                {allData.length === undefined ?
                    <h3>data not inserted</h3>
                    :
                    <h3>data inserted</h3>
                }
            </>

            {allData.length === undefined ?
                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h6 className='m-0'>Send Order</h6>
                    </CardHeader>
                    <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Form onSubmit={submitForm}>
                                <Row>
                                    <h5>Document Title: <b>{location.state.getData[0].title}</b>  </h5>
                                </Row>
                                <Row>
                                    <h5>Order No: <b>#{location.state.getData[0].id}</b></h5>
                                </Row>
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            <label htmlFor='name'>Name: </label>
                                            <FormSelect
                                                name="name"
                                                id="name"
                                                size="lg"
                                                style={{ fontWeight: '500', fontSize: '1.2rem', color: 'black' }}
                                                onChange={(e) => {
                                                    setSelected(e.target.value);
                                                    setSendDoc({
                                                        ...sendDoc,
                                                        [e.target.name]: e.target.value
                                                    });
                                                }}
                                                value={selected}
                                            >
                                                <option value="first">Select ---</option>
                                                {isuser.map((user, index) => (
                                                    <>
                                                        <option
                                                            key={user.id}
                                                            value={index}
                                                        >{user.name}</option>
                                                    </>
                                                ))}
                                            </FormSelect>
                                        </Col>
                                        <Col>
                                            {value &&
                                                <>
                                                    <label htmlFor='email'>Email: </label>
                                                    <FormInput
                                                        name="email"
                                                        id="email"
                                                        value={value.email}
                                                        onChange={onChangeValue}
                                                        style={{ fontWeight: '500', fontSize: '1rem', color: 'black' }}
                                                    >
                                                    </FormInput></>
                                            }
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            {value &&
                                                <>
                                                    <label htmlFor='user_id'>User id:</label>
                                                    <FormInput
                                                        name="user_id"
                                                        id="user_id"
                                                        style={{ fontWeight: '500', fontSize: '1rem', color: 'black' }}
                                                        value={value.id}
                                                        onChange={onChangeValue}
                                                    ></FormInput></>
                                            }
                                        </Col>
                                        <Col>
                                            {value &&
                                                <>
                                                    <label htmlFor='order_id' hidden>Order id</label>
                                                    <FormInput
                                                        name="order_id"
                                                        id="order_id"
                                                        value={location.state.getData[0].id}
                                                        onChange={onChangeValue}
                                                        style={{ fontWeight: '500', fontSize: '1rem', color: 'black' }}
                                                        hidden
                                                    >
                                                    </FormInput>
                                                </>
                                            }
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col md="6">
                                            <label htmlFor='conf_upload'>Confirm upload to blog</label>
                                            <FormCheckbox
                                                name="conf_upload"
                                                id="conf_upload"
                                                checked={sendDoc.conf_upload}
                                                onChange={(e) => {
                                                    setSendDoc({
                                                        ...sendDoc,
                                                        [e.target.name]: e.target.checked
                                                    })
                                                }}
                                                value={sendDoc.conf_upload}
                                                style={{ fontWeight: '500', fontSize: '1rem', color: 'black' }}
                                            >check the box to upload this document to the site's blog page</FormCheckbox>
                                        </Col>
                                        {/* <Col>
                                    <FormInput
                                        name="state"
                                        value={sendDoc.conf_upload.toString()}
                                        hidden
                                    ></FormInput>
                                </Col> */}
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col md="12" className="form-group">
                                            <label htmlFor="message">Any Message?</label>
                                            <FormTextarea id="message" name="message" onChange={onChangeValue} rows="4" style={{ fontWeight: '500', fontSize: '1rem', color: 'black' }} />
                                        </Col>
                                    </Row>
                                </FormGroup>

                                <FormGroup>
                                    <label htmlFor='files'>Upload document: </label>
                                    <Col
                                        lg="4">
                                        <FormInput
                                            type="file"
                                            name="file_url"
                                            accept="application/pdf/docx/png/jpg/jpeg"
                                            onChange={uploadFile}
                                        ></FormInput>
                                    </Col>
                                </FormGroup>


                                <Button
                                    type="submit" theme="accent" value="send"
                                    style={{ fontWeight: '500', fontSize: '0.9rem' }}
                                >Send</Button>

                            </Form>
                        </ListGroupItem>
                    </ListGroup>
                </Card>

                :

                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h6>Sent / Delivered</h6>
                    </CardHeader>
                    <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Row>
                                <h5>Document Title: <b>{location.state.getData[0].title}</b></h5>
                                <h5>order Id: <b>#{location.state.getData[0].id}</b></h5>
                                <h5>Writer: <b>{location.state.getData[0].writer_name}</b></h5>
                                <h5>Rating: </h5>
                                <h5>Client: <b>{allData[4].data.deliverlist.deliverdata[0].name}</b></h5>
                                <h5>Email: <b>{allData[4].data.deliverlist.deliverdata[0].email}</b></h5>
                                <h5>Document(s): <b>{allData[4].data.deliverlist.deliverdata[0].file_url}</b></h5>
                                <h5>Uploaded to blog: </h5>
                                <h5>Date Sent: <b>{allData[4].data.deliverlist.deliverdata[0].created_at}</b></h5>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card>

            }
        </>
    )
}

export default SendForm