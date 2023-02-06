import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";

import { UserContext } from '../../context/UserContext'

const UserDetails = ({ userDetails }) => {

  // const { user, logout } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    alladmins();
  }, []);

  const [isadmin, setadmin] = useState([]);
  const alladmins = async (ids) => {
    try {
      axios.get(
        `http://localhost:8000/essay-helpers/api/ad_login.php`
        // `https://graduate-essay-helpers.com/api/ad_login.php`
      )
        .then(res => {
          console.log(res.data.adminlist.admindata);
          setadmin(res.data.adminlist.admindata);
        })
    } catch (error) { throw error; }

    console.log(isadmin);
  }


  return (
    <>
      <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <h4>{isadmin ? 'admin' : 'admin-admin'}</h4>
            <img
              className="rounded-circle"
              src={userDetails.avatar}
              alt={userDetails.name}
              width="110"
            />
          </div>
          <h4 className="mb-0">{isadmin.email}</h4>
          <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
          <Button pill outline size="sm" className="mb-2">
            <i className="material-icons mr-1">person_add</i> Follow
          </Button>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-4">
            <div className="progress-wrapper">
              <strong className="text-muted d-block mb-2">
                {userDetails.performanceReportTitle}
              </strong>
              <Progress
                className="progress-sm"
                value={userDetails.performanceReportValue}
              >
                <span className="progress-value">
                  {userDetails.performanceReportValue}%
                </span>
              </Progress>
            </div>
          </ListGroupItem>
          <ListGroupItem className="p-4">
            <strong className="text-muted d-block mb-2">
              {userDetails.metaTitle}
            </strong>
            <span>{userDetails.metaValue}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </>
  );
}

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "",
    avatar: require("./../../images/user.png"),
    jobTitle: "Project Manager",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

export default UserDetails;
