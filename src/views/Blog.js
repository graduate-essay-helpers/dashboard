import React, { useState, useEffect } from 'react';
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
import PageTitle from "./../components/common/PageTitle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Add from './editor/Add';
import Edit from './editor/Edit';

// import BlogPosts from './BlogPosts';
import BlogPost from './BlogPost';
import { Warning } from 'postcss';

const Blog = () => {

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
                    setFileUrl(a);
                    setFileInfo(file);
                }).catch(e => console.log(e)) // Or Error in console
        }
        setfileName(file);
    }

    const [blgInfo, setBlgInfo] = useState({
        blog_title: "",
        conf_upload: true,
    })

    const onChangeValue = (e) => {
        setBlgInfo({
            ...blgInfo,
            [e.target.name]: e.target.value,
        })
    }

    const submitForm = async (event) => {
        const dtArr = {
            // name: value.name,
            // email: value.email,
            // user_id: value.id,
            title: blgInfo.blog_title,
            // message: sendDoc.message,
            // ord_id: location.state.getData[0].id,
            conf_upload: blgInfo.conf_upload.toString(),
            file_url: fileUrl.url,
            file_name: fileInfo.name,
            file_type: fileInfo.type,
            file_size: fileInfo.size,
        }

        // let one = "http://localhost:8000/essay-helpers/api/insertblog.php";
        // let two = "http://localhost:8000/essay-helpers/api/getBlogs.php";

        // let one = "https://graduate-essay-helpers.com/api/insertblog.php";
        // let two = "https://graduate-essay-helpers.com/api/getblog.php";

        // const requestOne = axios.post(one, dtArr);
        // const requestTwo = axios.post(two, dtArr);

        try {
            event.preventDefault();
            event.persist();
            // axios.post(`http://localhost:8000/essay-helpers/api/insertblog.php`, dtArr)
            axios.post(`https://graduate-essay-helpers.com/api/insertblog.php`, dtArr)
                .then(res => {
                    console.log(res);
                    alert("blog document uploaded successfully");
                    window.location.reload();
                })
        }
        catch (error) { throw error; }


    }

    return (
        <Container fluid className="main-content-container px-4 pb-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="Blog" subtitle="Upload to blog page" className="text-sm-left mb-3" />
            </Row>
            <Row>
                <Col lg="6">
                    <Form onSubmit={submitForm}>
                        <FormGroup className="">
                            <FormInput
                                name="blog_title"
                                type="text"
                                placeholder="Title"
                                onChange={onChangeValue}
                            >
                            </FormInput>
                            <Col hidden>
                                <FormCheckbox
                                    name="conf_upload"
                                    checked={blgInfo.conf_upload}
                                    onChange={(e) => {
                                        setBlgInfo({
                                            ...blgInfo,
                                            [e.target.name]: e.target.checked
                                        })
                                    }}
                                    value={blgInfo.conf_upload}
                                    hidden
                                >
                                </FormCheckbox>
                            </Col>
                            <FormInput
                                type="file"
                                name="file_url"
                                accept="pdf/doc/docx/png/jpg/jpeg/gif/ppt/pptx/xlsx/xls/xlsm/xltx/txt/mp3/mp4/zip"
                                onChange={uploadFile}
                            // multiple="true"
                            ></FormInput>

                            {!fileUrl.url ?
                                <>
                                    {fileName.name ?
                                        <>
                                            <div style={{ paddingTop: "1rem" }}>
                                                <FontAwesomeIcon
                                                    icon={faSpinner}
                                                    className="fa-spin"
                                                    style={{ fontSize: "1.7rem" }}
                                                    onClick={() => { }} />
                                            </div>
                                        </>
                                        :
                                        <>
                                        </>}
                                    <Button
                                        type="submit" theme="accent" value="send"
                                        style={{ fontWeight: '500', fontSize: '0.9rem', marginTop: '10px' }}
                                        disabled
                                    >Upload</Button>
                                </>
                                :
                                <>
                                    <Button
                                        type="submit" theme="accent" value="send"
                                        style={{ fontWeight: '500', fontSize: '0.9rem', marginTop: '10px' }}
                                        enabled
                                    >Upload</Button>
                                </>
                            }
                        </FormGroup>
                    </Form>
                </Col>

                <Col lg="4">
                    <div>
                        <Link to="/editor">
                            <Button
                                style={{ position: 'relative', left: '100%', fontSize: '1.3rem', fontWeight: '500' }}
                            >Editor</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <BlogPost />
                </Col>
            </Row>
        </Container>
    );
}

export default Blog;