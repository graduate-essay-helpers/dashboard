import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./Grid.css";
import { motion } from "framer-motion";
import {
  cardAnimation,
  ImageTextTransition,
  cardTransition,
} from "../animation/Animation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';

import {
  Button as Btn
} from "shards-react";

import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { images } from '../constant';

const Grid = () => {

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
      await axios.get(`http://localhost:8088/allPost`,)
        // await axios.get(`https://editor.graduate-essay-helpers.com/allPost`)
        .then(res => {
          if (res.data.success === true) {
            setblogPost(res.data.listall);
            console.log(res);
          }
        })
    } catch (error) { throw error; }

    // try {
    //   // axios.get(`http://localhost:8000/essay-helpers/api/getBlogs.php`)
    //   axios.get(`https://graduate-essay-helpers.com/api/getBlogs.php`)
    //     .then(res => {
    //       console.log(res);
    //       console.log(res.data.bloglist.blogdata);
    //       setblogPost(res.data.bloglist.blogdata);
    //     })
    // }
    // catch (error) { throw error; }
  }

  const btnClicked = (itemIndex) => {
    const id = blgRef.current[itemIndex].id;

    setDocId(id);

    // axios.post(`http://localhost:8000/essay-helpers/api/deleteblog.php`, { blg_id: id })
    axios.post(`https://graduate-essay-helpers.com/api/deleteblog.php`, { blg_id: id })
      .then(res => {
        console.log("deleted");
      })

    console.log(id);
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


      <div className="grid">
        {
          blogPost.map((blog, index) => {
            return (
              <motion.div
                className="grid_card"
                layoutId={blog.id}
                transition={cardTransition}
              >
                {blog.content === null
                  ?
                  <motion.img
                    src={images.fileicon}
                    alt="blogPost"
                    variants={cardAnimation}
                    initial="hidden"
                    animate="show"
                    transition={ImageTextTransition}
                  />
                  :
                  <>
                    <motion.div
                      className="edited"
                      variants={cardAnimation}
                      initial="hidden"
                      animate="show"
                      transition={ImageTextTransition}
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    >
                    </motion.div>
                  </>
                }
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
                  {blog.content === null
                    ?
                    <>
                      <Btn
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `${blog.file_url}`
                        }}
                      >
                        {/* <FontAwesomeIcon
                      icon={faEye}
                    ></FontAwesomeIcon> */}
                        view</Btn>

                      <Btn variant="outlined" onClick={() => handleClickOpen(index)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                        ></FontAwesomeIcon>
                        delete
                      </Btn>

                    </>

                    :
                    <>
                      <Link
                        to={`/edit/${blog.id}`}
                      >
                        <Btn
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                          ></FontAwesomeIcon>
                          Edit</Btn>
                      </Link>

                      <Button className="trash-btn" variant="outlined" onClick={() => handleClickOpen(index)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                        ></FontAwesomeIcon>
                        delete
                      </Button>
                    </>
                  }


                </motion.div>
              </motion.div>
            )
          })
        }
      </div>
    </>

    // <div className="grid">
    //   {Data.map((watch, index) => {
    //     return (
    //       <motion.div
    //         className="grid_card"
    //         layoutId={watch.image}
    //         transition={cardTransition}>
    //         <motion.img
    //           src={watch.image}
    //           alt="aluku"
    //           variants={cardAnimation}
    //           initial="hidden"
    //           animate="show"
    //           transition={ImageTextTransition}
    //         />
    //         <img src="https://media.istockphoto.com/id/471846571/photo/kingfisher-alcedo-atthis.jpg?s=612x612&w=0&k=20&c=hALzIDcQjPiiumLHgJfYdqe9uiUieqB6yqmM7QDcZgE=" alt="test" />
    //         <motion.p
    //           variants={cardAnimation}
    //           initial="hidden"
    //           animate="show"
    //           transition={ImageTextTransition}>
    //           {watch.name}
    //         </motion.p>
    //       </motion.div>
    //     );
    //   })}
    // </div>
  );
};

export default Grid;
