import React, { useState } from "react";
// import axios from 'axios';
import PropTypes from "prop-types";
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
} from "shards-react";

const SettingsFormTwo = ({ title }) => {

  // const [siteInfo, setsiteInfo] = useState({
  //   site_name: '',
  //   phone: '',
  //   comp_email: '',
  //   map: '',
  //   address: '',
  //   facebook: '',
  //   twitter: '',
  //   linkedin: '',
  //   instagram: '',
  //   youtube: '',
  // });

  // const onChangeValue = (e) => {
  //   setsiteInfo({
  //     ...siteInfo,
  //     [e.target.name]: e.target.value
  //   });
  // }

  // const submitSetting = async (event) => {
  //   try {
  //     event.preventDefault();
  //     event.persist();

  //     axios.post(
  //       `http://localhost:8000/essay-helpers/api/editsetting.php`
  //       // `https://graduate-essay-helpers.com/api/editsetting.php`
  //       , {
  //         site_name: siteInfo.site_name,
  //         phone: siteInfo.phone,
  //         comp_email: siteInfo.comp_email,
  //         map: siteInfo.map,
  //         address: siteInfo.address,
  //         facebook: siteInfo.facebook,
  //         twitter: siteInfo.twitter,
  //         linkedin: siteInfo.linkedin,
  //         instagram: siteInfo.instagram,
  //         youtube: siteInfo.youtube,
  //         settingsid: props.list.id,
  //       })
  //       .then(res => {
  //         console.log(res.data);
  //         return;
  //       })
  //   } catch (error) { throw error; }
  // };

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <FormGroup>
                  <label htmlFor="facebook">Facebook</label>
                  <FormInput
                    id="facebook"
                    placeholder="facebook"
                    value=""
                    onChange={() => { }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="twitter">Twitter</label>
                  <FormInput
                    id="twitter"
                    placeholder="twitter"
                    value=""
                    onChange={() => { }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="linkedin">LinkedIn</label>
                  <FormInput
                    id="linkedin"
                    placeholder="linkedin"
                    value=""
                    onChange={() => { }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="instagram">Instagram</label>
                  <FormInput
                    id="instagram"
                    placeholder="instagram"
                    value=""
                    onChange={() => { }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="youtube">Youtube</label>
                  <FormInput
                    id="youtube"
                    placeholder="youtube"
                    value=""
                    onChange={() => { }}
                  />
                </FormGroup>
                <Button theme="accent">Update</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}

SettingsFormTwo.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SettingsFormTwo.defaultProps = {
  title: "Socials"
};

export default SettingsFormTwo;
