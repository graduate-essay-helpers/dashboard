import React, { useState, useEffect } from "react";
import axios from 'axios';
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

const SettingsFormOne = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
    setting();
  }, []);

  const [getSetting, setgetSetting] = useState([]);
  const setting = async (ids) => {
    try {
      axios.get(
        // `http://localhost:8000/essay-helpers/api/getsettings.php`
        `https://graduate-essay-helpers.com/api/getsettings.php`
      )
        .then(res => {
          console.log(res.data.settinglist.settingdata)
          setgetSetting(res.data.settinglist.settingdata);
        })
    } catch (error) { throw error; }
  }

  // console.log(getSetting[0])

  const [siteInfo, setsiteInfo] = useState({
    site_name: '',
    phone: '',
    comp_email: '',
    map: '',
    address: '',
  });

  // const [siteUpdateInfo, setsiteUpdateInfo] = useState({
  //   site_name: props.list.site_name,
  //   phone: props.list.phone,
  //   comp_email: props.list.comp_email,
  //   map: props.list.map,
  //   address: props.list.address,
  // })

  const onChangeValue = (e) => {
    setsiteInfo({
      ...siteInfo,
      [e.target.name]: e.target.value
    });
  }

  const submitSetting = async (event) => {
    try {
      event.preventDefault();
      event.persist();

      axios.post(
        // `http://localhost:8000/essay-helpers/api/addsetting.php`
        `https://graduate-essay-helpers.com/api/addsetting.php`
        , {
          site_name: siteInfo.site_name,
          phone: siteInfo.phone,
          comp_email: siteInfo.comp_email,
          map: siteInfo.map,
          address: siteInfo.address,
          // setting_id: props.list.id,
          // facebook: siteInfo.facebook,
          // twitter: siteInfo.twitter,
          // linkedin: siteInfo.linkedin,
          // instagram: siteInfo.instagram,
          // youtube: siteInfo.youtube,
        })
        .then(res => {
          console.log(res.data);
          return;
        })
    } catch (error) { throw error; }
  };

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Site Info</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form className="insertForm" onSubmit={submitSetting}>
                <FormGroup>
                  <label htmlFor="site_name">Site Name</label>
                  <FormInput
                    id="site_name"
                    name="site_name"
                    placeholder="site name"
                    value="GraduateEssayHelpers"
                    onChange={onChangeValue}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="phone">Phone</label>
                  <FormInput
                    id="phone"
                    name="phone"
                    // type="number"
                    placeholder="phone"
                    value="+1 (201) 381-1580"
                    onChange={onChangeValue}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="comp_email">Company Email</label>
                  <FormInput
                    id="comp_email"
                    name="comp_email"
                    placeholder="company email address"
                    value={siteInfo.comp_email}
                    onChange={onChangeValue}
                  />
                </FormGroup>
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="map">Map</label>
                    <FormTextarea id="map" name="map" rows="4" />
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="ddress">Address with pincode</label>
                  <FormInput
                    id="address"
                    name="address"
                    placeholder="Address"
                    // value=""
                    onChange={onChangeValue}
                  />
                </FormGroup>
                <Button type="submit" theme="accent">Update</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}

SettingsFormOne.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SettingsFormOne.defaultProps = {
  title: "Details"
};

export default SettingsFormOne;
