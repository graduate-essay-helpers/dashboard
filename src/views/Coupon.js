import React from 'react';

import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import GenCoupon from "../components/coupon/GenCoupon";
import CouponsTable from '../components/coupon/CouponsTable';
const Coupon = () => {

    // function generate(length) {
    //     var result = '';
    //     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
    //     var charactersLength = characters.length;
    //     for (var i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() *
    //             charactersLength));
    //     }
    //     return result;
    // }

    // console.log(generate(20));

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
            <Row>
                <Col>
                    <CouponsTable />
                </Col>
            </Row>
        </Container>
    )
}

export default Coupon