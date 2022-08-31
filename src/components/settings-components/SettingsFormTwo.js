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

const SettingsFormTwo = ({ title }) => (
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
