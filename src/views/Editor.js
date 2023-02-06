import React, { useState } from 'react';
import PageTitle from "./../components/common/PageTitle";
import {
    Container,
    Row,
    Col,
    Button
} from "shards-react";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor as Edtr } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import './Editor.css';

const Editor = () => {

    let history = useHistory();
    const [userInfo, setuserInfo] = useState({
        title: '',
    });
    const onChangeValue = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }

    let editorState = EditorState.createEmpty();
    const [description, setDescription] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }

    const [isError, setError] = useState(null);
    const addDetails = async (event) => {
        try {
            event.preventDefault();
            event.persist();
            if (userInfo.description.value.length < 50) {
                setError('Required! Add Content Section, Minimum length 50 characters...');
                return;
            } else {
                setError('');
            }
            axios.post(`http://localhost:8080/editor_api/allPost`, {
                title: userInfo.title,
                description: userInfo.description.value
            })
                .then(res => {
                    if (res.data.success === true) {
                        console.log(res);
                        alert("uploaded successfully");
                        // history.push('/');
                    }
                })
        } catch (error) { throw error; }
    }

    return (
        <Container fluid className="main-content-container px-4 pb-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="Editor" subtitle="edit blog page content" className="text-sm-left mb-3" />
            </Row>
            <Row>
                <Col>
                    <>
                        {/* <div className="App"> */}
                        <div className="content_container">
                            <div className="row content_row">
                                <form onSubmit={addDetails} className="update__forms">
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label className="font-weight-bold"> Title <span className="required"> * </span> </label>
                                            <input type="text" name="title" value={userInfo.title} onChange={onChangeValue} className="form-control" placeholder="Title" required />
                                        </div>
                                        <div className="form-group col-md-12 editor">
                                            <label className="font-weight-bold"> Content <span className="required"> * </span> </label>
                                            <Edtr
                                                editorState={description}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={onEditorStateChange}
                                            />
                                            <textarea style={{ display: 'none' }} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent()))} />
                                        </div>
                                        {isError !== null && <div className="errors"> {isError} </div>}
                                        <div className="form-group col-sm-12 text-right">
                                            {/* <button type="submit" className="btn btn__theme"> Submit  </button> */}
                                            <Button>Submit</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* </div> */}
                    </>
                </Col>
            </Row>
        </Container>
    )
}

export default Editor