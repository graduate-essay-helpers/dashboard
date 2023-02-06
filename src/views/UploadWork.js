import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    Container,
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
import { useLocation } from 'react-router-dom';

import PageTitle from "./../components/common/PageTitle";
import NewPostBtn from '../posts/NewPostBtn';

import { images } from "./../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'

// import SendForm from '../components/order-upload/SendForm';
// import OpenForm from '../components/open-send-form/OpenForm';


import './Upload.css';





const UploadWork = (props) => {

    const SendForm = () => {

        const location = useLocation();

        console.log(props)

        // ============================================================

        const [fileUrl, setFileUrl] = useState({});
        const [fileInfo, setFileInfo] = useState({});
        const [fileName, setfileName] = useState({
            file_url: "",
        })

        function uploadFile(e) {
            var file = e.target.files[0] //the file
            var reader = new FileReader() //this for convert to Base64 
            reader.readAsDataURL(file) //start conversion...
            reader.onload = function (e) { //.. once finished..
                var rawLog = reader.result.split(',')[1]; //extract only thee file data part
                var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
                fetch('https://script.google.com/macros/s/AKfycbxrJ9OhkB7n0QdO3hPAbyuQbFJ6f9Hv2C5AK--5kcCwGqP0dilfzKyj8vK6aoK1dQOO/exec', //your AppsScript URL
                    { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
                    .then(res => res.json()).then((a) => {
                        console.log(a) //See response
                        console.log(file);
                        console.log(reader);
                        console.log(rawLog);
                        console.log(dataSend);
                        setFileUrl(a);
                        setFileInfo(file);
                    }).catch(e => console.log(e)) // Or Error in console
            }
            setfileName(file);
            console.log(file);
            console.log(e);
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
                        return;
                    })
            } catch (error) { throw error; }
        };

        console.log(isuser);
        console.log(fileInfo);
        console.log(fileUrl);

        // ===========================================

        const usId = location.state.clntDt;

        const [selected, setSelected] = useState(0);

        const value = selected !== -1 && usId[selected];

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

            // let one = "http://localhost:8000/essay-helpers/api/updateorder.php";
            // let two = "http://localhost:8000/essay-helpers/api/insertdeliver.php";
            // let three = "http://localhost:8000/essay-helpers/api/insertblog.php";
            // let four = "http://localhost:8000/essay-helpers/api/getblog.php";
            // let five = "http://localhost:8000/essay-helpers/api/getdelivered.php";
            // let six = "http://localhost:8000/essay-helpers/api/getorder.php";

            let one = "https://graduate-essay-helpers.com/api/updateorder.php";
            let two = "https://graduate-essay-helpers.com/api/insertdeliver.php";
            let three = "https://graduate-essay-helpers.com/api/insertblog.php";
            let four = "https://graduate-essay-helpers.com/api/getblog.php";
            let five = "https://graduate-essay-helpers.com/api/getdelivered.php";
            let six = "https://graduate-essay-helpers.com/api/getorder.php";

            const requestOne = axios.post(one, dtArr);
            const requestTwo = axios.post(two, dtArr);
            const requestThree = axios.post(three, dtArr);
            const requestFour = axios.post(four, dtArr);
            const requestFive = axios.post(five, dtArr);
            const requestSix = axios.post(six, dtArr);

            try {
                event.preventDefault();
                event.persist();
                axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix])
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
                        if (res[0].data.success == true && res[1].data.success == true && res[2].data === "") {
                            setAllData(res);
                            props.history.push({ pathname: "/upload-work/", search: "sent", state: { delvData: res[4].data.deliverlist.deliverdata, ordData: res[5].data.orderlist.orderdata } });
                            alert(`Finished document successfully sent to ${value.name}`);
                        } else if (res[0].data.success == true && res[1].data.success == true && res[2].data !== "") {
                            setAllData(res);
                            props.history.push({ pathname: "/upload-work/", search: "sent", state: { delvData: res[4].data.deliverlist.deliverdata, blgData: res[3].data.bloglist.blogdata, ordData: res[5].data.orderlist.orderdata } });
                            alert(`Finished document successfully sent to ${value.name}`);
                        }
                        return;
                    }))
            } catch (error) { throw error; }

            console.log(dtArr);
        }

        console.log(allData);
        console.log(fileInfo);
        console.log(location);
        console.log(sendDoc);
        console.log(fileName);
        console.log(selected);

        // =====================================================================


        return (
            <>

                {location.search === "?sent" ?
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6>Sent / Delivered</h6>
                        </CardHeader>
                        <ListGroup flush>
                            <ListGroupItem className="p-3">
                                <Row>
                                    <h5>Document Title: <b>{location.state.ordData[0].title}</b></h5>
                                    <h5>order Id: <b>#{location.state.ordData[0].id}</b></h5>
                                    <h5>Writer: <b>{location.state.ordData[0].writer_name}</b></h5>
                                    <h5>Rating: </h5>
                                    <h5>Client: <b>{location.state.delvData[0].name}</b></h5>
                                    <h5>Email: <b>{location.state.delvData[0].email}</b></h5>
                                    <h5>Document(s): <b>{
                                        location.state.delvData[0].map((file, index) => (
                                            <>
                                                {

                                                    <>

                                                        <a href={file.file_url}
                                                            target="_blank">
                                                            {file.file_name}
                                                        </a>
                                                        <br />
                                                    </>
                                                }
                                            </>
                                        ))
                                    }</b></h5>
                                    <h5 style={{ display: "flex", gap: "1rem" }}>Uploaded to blog?:
                                        {location.state.blgData ?
                                            <img
                                                src={images.CheckMark}
                                                alt="check mark"
                                                style={{ width: "30px" }}
                                            />
                                            :
                                            <>
                                                <div style={{ display: "flex", gap: "1rem" }}>
                                                    <img
                                                        src={images.CrossMark}
                                                        alt="cross mark"
                                                        style={{ width: "30px" }}
                                                    />
                                                    {/* <Button value="Upload">Upload</Button> */}
                                                </div>
                                            </>
                                        }
                                    </h5>
                                    <h5>Date Sent: <b>{location.state.delvData[0].created_at}</b></h5>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>

                    :

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
                                                <label htmlFor='name'>User Id ({location.state.clntDt[0].id}): </label>
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
                                                    {usId.map((user, index) => (
                                                        <>
                                                            <option
                                                                key={user.id}
                                                                value={index}
                                                            >{user.id}</option>
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
                                                            disabled
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
                                                        <label htmlFor='user_id'>Name:</label>
                                                        <FormInput
                                                            name="user_id"
                                                            id="user_id"
                                                            disabled
                                                            style={{ fontWeight: '500', fontSize: '1rem', color: 'black' }}
                                                            value={value.name}
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
                                                accept="pdf/doc/docx/png/jpg/jpeg/gif/ppt/pptx/xlsx/xls/xlsm/xltx/txt/mp3/mp4/zip"
                                                onChange={uploadFile}
                                                multiple
                                            ></FormInput>
                                            {fileName.name ?
                                                <>
                                                    {!fileUrl.url ? <div style={{ paddingTop: "1rem" }}>
                                                        <FontAwesomeIcon
                                                            icon={faSpinner}
                                                            className="fa-spin"
                                                            style={{ fontSize: "1.7rem" }}
                                                            onClick={() => { }} />
                                                    </div>
                                                        :
                                                        <div style={{ paddingTop: "1rem", display: "flex", gap: "1rem" }}>
                                                            <FontAwesomeIcon
                                                                icon={faFileAlt}
                                                                className="fa-file"
                                                                style={{ fontSize: "1.7rem" }}
                                                                onClick={() => { }} /><h6>uploaded</h6>
                                                        </div>}
                                                </>
                                                :
                                                <></>
                                            }

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

                }
            </>
        )
    }

    const location = useLocation();

    console.log(location);

    useEffect(() => {
        window.scrollTo(0, 0);
        allorders();
    }, []);



    console.log(props)

    const [isorder, setOrder] = useState([]);
    const allorders = async (ids) => {
        try {
            // axios.get(`http://localhost:8000/essay-helpers/api/getorders.php`)
            axios.get(`https://graduate-essay-helpers.com/api/getorders.php`)
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
        ord_id: "",
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
        const dt = {
            ord_id: value.id,
            user_id: value.user_id,
            title: getTitle.title,
        }

        // let urlOne = "http://localhost:8000/essay-helpers/api/getorder.php";
        // let urlTwo = "http://localhost:8000/essay-helpers/api/getdelivered.php";
        // let urlThree = "http://localhost:8000/essay-helpers/api/getblog.php";

        let urlOne = "https://graduate-essay-helpers.com/api/getorder.php";
        let urlTwo = "https://graduate-essay-helpers.com/api/getdelivered.php";
        let urlThree = "https://graduate-essay-helpers.com/api/getblog.php";
        let urlFour = "https://graduate-essay-helpers.com/api/getuser.php";

        const reqOne = axios.post(urlOne, dt);
        const reqTwo = axios.post(urlTwo, dt);
        const reqThree = axios.post(urlThree, dt);
        const reqFour = axios.post(urlFour, dt);

        try {
            e.preventDefault();
            e.persist();
            axios.all([reqOne, reqTwo, reqThree, reqFour])
                .then(axios.spread((...res) => {
                    console.log(res);
                    setGetTitle(res[0].data.orderlist.orderdata);
                    ttlRef.current = res[0].data.orderlist.orderdata;

                    const id = ttlRef.current[0].id
                    console.log(id);

                    setOrderId(id);
                    if (res[0].data.success === true && res[1].data.success === false) {
                        props.history.push({ pathname: "/upload-work/", search: "?id=" + id, state: { getData: res[0].data.orderlist.orderdata, clntDt: res[3].data.userlist.userdata } })
                    } else if (res[0].data.success === true && res[1].data.success === true && res[2].data.success === false) {
                        props.history.push({ pathname: "/upload-work/", search: "sent", state: { ordData: res[0].data.orderlist.orderdata, delvData: res[1].data.deliverlist.deliverdata } })
                    } else if (res[0].data.success === true && res[1].data.success === true && res[2].data.success === true) {
                        props.history.push({ pathname: "/upload-work/", search: "sent", state: { ordData: res[0].data.orderlist.orderdata, delvData: res[1].data.deliverlist.deliverdata, blgData: res[2].data.bloglist.blogdata } })
                    }
                    return;
                }))

        } catch (error) { throw error; }
        console.log(dt);
    };

    console.log(getTitle);

    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="Upload Work" subtitle="" className="text-sm-left mb-3" />
            </Row>
            {
                location.search != "" ?
                    <>
                        {location.state.delvData ?

                            <Card small className="mb-4">
                                <CardHeader className="border-bottom">
                                    <h6>Sent / Delivered</h6>
                                </CardHeader>
                                <ListGroup flush>
                                    <ListGroupItem className="p-3">
                                        <Row>
                                            <h5>Document Title: <b>{location.state.ordData[0].title}</b></h5>
                                            <h5>order Id: <b>#{location.state.ordData[0].id}</b></h5>
                                            <h5>Writer: <b>{location.state.ordData[0].writer_name}</b></h5>
                                            <h5>Rating: </h5>
                                            <h5>Client: <b>{location.state.delvData[0].name}</b></h5>
                                            <h5>Email: <b>{location.state.delvData[0].email}</b></h5>
                                            <h5>Document(s): <b>{
                                                location.state.delvData.map((file, index) => (
                                                    <>
                                                        {
                                                            <>

                                                                <a href={file.file_url}
                                                                    target="_blank">
                                                                    {file.file_name}
                                                                </a>
                                                                <br />
                                                            </>
                                                        }
                                                    </>
                                                ))
                                            }</b></h5>
                                            <h5 style={{ display: "flex", gap: "1rem" }}>Uploaded to blog?:
                                                {location.state.blgData ?
                                                    <img
                                                        src={images.CheckMark}
                                                        alt="check mark"
                                                        style={{ width: "30px" }}
                                                    />
                                                    :
                                                    <>
                                                        <div style={{ display: "flex", gap: "1rem" }}>
                                                            <img
                                                                src={images.CrossMark}
                                                                alt="cross mark"
                                                                style={{ width: "30px" }}
                                                            />
                                                            {/* <Button value="Upload">Upload</Button> */}
                                                        </div>
                                                    </>
                                                }
                                            </h5>
                                            <h5>Date Sent: <b>{location.state.delvData[0].created_at}</b></h5>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>

                            :

                            <Row>
                                <Col lg="12">
                                    <SendForm />
                                </Col>
                            </Row>
                        }
                    </>
                    :
                    <>
                        <Row>
                            <Col lg="12">
                                <Card small className="mb-4">
                                    <CardHeader className="border-bottom">
                                        <h6 className='m-0'>Send Order</h6>
                                    </CardHeader>
                                    <ListGroup flush>
                                        <ListGroupItem className="p-3">
                                            <Form onSubmit={submitForm}>
                                                <FormGroup>
                                                    <label htmlFor='title'><b>Order id: </b></label>
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
                                                                    >{order.id}</option>
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
                                                                    <label htmlFor='order_id'><b>Document Title: </b></label>
                                                                    <FormInput
                                                                        name="ord_id"
                                                                        id="order_id"
                                                                        disabled
                                                                        value={value.title}
                                                                        onChange={onChangeValue}
                                                                        style={{ fontWeight: '500', fontSize: '1rem', color: 'black' }}
                                                                    ></FormInput>
                                                                </>
                                                            }
                                                        </Col>
                                                        <Col lg="5">
                                                            {value &&
                                                                <>
                                                                    <label htmlFor='user_id'><b>For User id: </b></label>
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
                            </Col>
                        </Row>
                    </>
            }



        </Container>

    )
}

export default UploadWork