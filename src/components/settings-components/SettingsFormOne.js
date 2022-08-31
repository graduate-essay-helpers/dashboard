import React from "react";
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

const SettingsFormOne = ({ title }) => (
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
                <label htmlFor="stName">Site Name</label>
                <FormInput
                  id="stName"
                  placeholder="site name"
                  value="GraduateEssayHelpers"
                  onChange={() => { }}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="phone">Phone</label>
                <FormInput
                  id="phone"
                  // type="number"
                  placeholder="phone"
                  value="+1 (201) 381-1580"
                  onChange={() => { }}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="compEmail">Company Email</label>
                <FormInput
                  id="compEmail"
                  placeholder="company email address"
                  value=""
                  onChange={() => { }}
                />
              </FormGroup>
              <Row form>
                <Col md="12" className="form-group">
                  <label htmlFor="map">Map</label>
                  <FormTextarea id="map" rows="4" />
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feAddress">Address with pincode</label>
                <FormInput
                  id="feAddress"
                  placeholder="Address"
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
