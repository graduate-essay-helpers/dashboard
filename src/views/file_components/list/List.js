import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import {
  Button as Btn
} from "shards-react";
import "./List.css";
import { motion } from "framer-motion";
import {
  cardAnimation,
  ImageTextTransition,
  cardTransition,
} from "../animation/Animation";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import { images } from '../constant';

const List = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    allBlogPosts();
  }, []);

  const blgRef = useRef();

  const [blogPost, setblogPost] = useState([]);
  const [docId, setDocId] = useState([]);
  blgRef.current = blogPost;
  const [del, setDel] = useState({
    blgID: "",
  })


  const allBlogPosts = async () => {

    try {
      // axios.get(`http://localhost:8000/essay-helpers/api/getBlogs.php`)
      axios.get(`https://graduate-essay-helpers.com/api/getBlogs.php`)
        .then(res => {
          console.log(res.data.bloglist.blogdata);
          setblogPost(res.data.bloglist.blogdata);
        })
    }
    catch (error) { throw error; }
  }

  // ====================================================================================

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (itemIndex) => {
    const id = blgRef.current[itemIndex].id;
    setDocId(id);
    setOpen(true);
    console.log(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    setOpen(false);
    // axios.post(`http://localhost:8000/essay-helpers/api/deleteblog.php`, { blg_id: docId })
    axios.post(`https://graduate-essay-helpers.com/api/deleteblog.php`, { blg_id: docId })
      .then(res => {
        console.log("deleted");
      })
    alert("deleted!..");
    window.location.reload();
  };

  const handleNo = () => {
    setOpen(false);
  }

  // ====================================================================================


  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm delete"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this item from the blog page?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNo}>No</Button>
            <Button onClick={handleYes} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* =========================================================================== */}


      <div className="list">
        {
          blogPost.map((blog, index) => {
            return (
              <motion.div
                className="list_card"
                layoutId={blog.id}
                transition={cardTransition}
              >

                <motion.img
                  src={images.fileicon}
                  alt="blogPost"
                  variants={cardAnimation}
                  initial="hidden"
                  animate="show"
                  transition={ImageTextTransition}
                />
                <div className="list_content">
                  <motion.h6
                    variants={cardAnimation}
                    initial="hidden"
                    animate="show"
                    transition={ImageTextTransition}>
                    {blog.title}
                  </motion.h6>
                  <motion.div
                    className="btn"
                    variants={cardAnimation}
                    initial="hidden"
                    animate="show"
                    transition={ImageTextTransition}
                  >
                    <Btn
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `${blog.file_url}`
                      }}
                    >view</Btn>

                    <Btn variant="outlined" onClick={() => handleClickOpen(index)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                      ></FontAwesomeIcon>
                      delete
                    </Btn>
                  </motion.div>
                </div>
              </motion.div>
            )
          })
        }
      </div>
    </>
  );
};
export default List;
