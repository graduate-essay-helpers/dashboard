import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditPost from './EditPost';

const Edit = (props) => {
    console.log(props)
    useEffect(() => {
        viewPostId(props.match.params.postID);
    }, []);

    const [ispostId, setpostId] = useState([]);
    const viewPostId = async (ids) => {
        try {
            // await axios.post(`http://localhost:8080/getPostId`, {
            await axios.post(`https://editor.graduate-essay-helpers.com/getPostId`, {
                ids: props.match.params.postID
            })
                .then(res => {
                    if (res.data.success === true) {
                        setpostId(res.data.listId);
                    }
                })
        } catch (error) { throw error; }
    }

    return (
        <>
            {ispostId.length > 0 ? <>
                <EditPost postList={ispostId} editPostID={props.match.params.postID} />
            </> : null}

        </>
    )
}
export default Edit;
