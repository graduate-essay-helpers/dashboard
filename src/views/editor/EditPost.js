import React, { useState } from 'react';
import PageTitle from "../../components/common/PageTitle";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { useHistory } from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
    Container,
    Row,
    Col,
    Button
} from "shards-react";
import axios from 'axios';

import "./Editor.css";

const EditPost = (props) => {

    console.log(props);

    let history = useHistory();
    const [userInfo, setuserInfo] = useState({
        title: props.postList[0].title,
    });
    const onChangeValue = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    let editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
            convertFromHTML(props.postList[0].content)
        ));
    const [content, setContent] = useState(editorState);

    const onEditorStateChange = (editorState) => {
        setContent(editorState);
    }

    const [isError, setError] = useState(null);
    const PoemAddbooks = async (event) => {
        try {
            event.preventDefault();
            event.persist();
            if (userInfo.content.value.length < 50) {
                setError('Required! Add Content Section, Minimum length 50 characters...');
                return;
            }
            // axios.post(`http://localhost:8080/editArticle`, {
            axios.post(`https://editor.graduate-essay-helpers.com/editArticle`, {
                title: userInfo.title,
                content: userInfo.content.value,
                ids: props.editPostID
            })
                .then(res => { // then print response status
                    if (res.data.success === true) {
                        history.push('/blog');
                        console.log(res);
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
                        <div className="content_container">
                            <div className="row content_row">
                                <form onSubmit={PoemAddbooks} className="update__forms">
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label className="font-weight-bold"> Title <span className="required"> * </span> </label>
                                            <input type="text" name="title" value={userInfo.title} onChange={onChangeValue} className="form-control" placeholder="Title" required />
                                        </div>
                                        <div className="form-group col-md-12 editor">
                                            <label className="font-weight-bold"> Content <span className="required"> * </span> </label>
                                            <Editor
                                                editorState={content}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={onEditorStateChange}
                                            />
                                            <textarea style={{ display: 'none' }} disabled ref={(val) => userInfo.content = val} value={draftToHtml(convertToRaw(content.getCurrentContent()))} />
                                        </div>
                                        {isError !== null && <div className="errors"> {isError} </div>}
                                        <div className="form-group col-sm-12 text-left">
                                            {/* <button type="submit" className="btn btn__theme"> Submit  </button> */}
                                            <Button>Save</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                </Col>
            </Row>
        </Container>
    )
}

export default EditPost;