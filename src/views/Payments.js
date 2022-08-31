import React from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";

import "./../payments.scss";

const Payments = () => {

    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <h3>Money Management</h3>
                <PageTitle title="" subtitle="Transaction Summary" className="text-sm-left mb-3" />
            </Row>
            <Row>
                <div className='pymnts'>
                    <div className="card">
                        <h3>Total Credit</h3>
                        <div className='card-sm'>
                            <h4>$23,600.50</h4>
                        </div>
                        <p>Amount loaded from paypal/credit_card to system</p>
                    </div>

                    <div className="card">
                        <h3>Total Money Paid</h3>
                        <div className='card-sm'>
                            <h4>$23,600.50</h4>
                        </div>
                        <p>Amount paid too writer and user as withdrawal approved</p>
                    </div>

                    <div className="card">
                        <h3>Total Earnings</h3>
                        <div className='card-sm'>
                            <h4>$23,600.50</h4>
                        </div>
                        <p>Total commission earned</p>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default Payments