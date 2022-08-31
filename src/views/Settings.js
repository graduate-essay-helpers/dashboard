import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
// import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import SettingsFormOne from "../components/settings-components/SettingsFormOne";
import SettingsFormTwo from "../components/settings-components/SettingsFormTwo";


const Settings = () => (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle title="Settings" subtitle="Site" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
            <Col lg="6">
                <SettingsFormOne />
            </Col>
            <Col lg="6">
                <SettingsFormTwo />
            </Col>
        </Row>
    </Container>
);


export default Settings