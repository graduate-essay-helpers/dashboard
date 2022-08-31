import React from 'react';

import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import GenCoupon from "../components/coupon/GenCoupon";
const Coupon = () => {
    return (
        <Container fluid className="main-content-container px-4 pb-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="Coupons" subtitle="Generate Coupon" className="text-sm-left mb-3" />
            </Row>
            <Row>
                <Col lg="8">
                    <GenCoupon />
                </Col>
            </Row>
        </Container>
    )
}

export default Coupon