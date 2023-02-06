import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import {
    Container as Cnt,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
} from 'reactstrap';
import axios from "axios";

import PageTitle from "./../components/common/PageTitle";

import TableContainer from './TableContainer';
import { SelectColumnFilter } from './filters';
// import "./../payments.css";

const Payments = () => {

    const [data, setData] = useState([]);

    // ===========================================================

    useEffect(() => {
        window.scrollTo(0, 0);
        allpayments();
    }, []);

    const [ispayment, setpayment] = useState([]);
    const allpayments = async (ids) => {
        try {
            // axios.get(`http://localhost:8000/essay-helpers/api/getpayments.php`)
            axios.get(`https://graduate-essay-helpers.com/api/getpayments.php`)
                .then(res => {
                    console.log(res.data.paymentlist.paymentdata)
                    setpayment(res.data.paymentlist.paymentdata);
                })
        } catch (error) { throw error; }
    };

    // ==============================================================


    const columns = useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id',
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',
            },
            {
                Header: 'Order id',
                accessor: 'ord_id',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Ref No',
                accessor: 'order_id',
            },
            {
                Header: 'Transaction id',
                accessor: 'transaction_id',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },

        ],
        []
    );

    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <h3>Money Management</h3>
                <PageTitle title="" subtitle="Transaction Summary" className="text-sm-left mb-3" />
            </Row>
            <TableContainer
                columns={columns}
                data={ispayment}
            // renderRowSubComponent={renderRowSubComponent}
            />
        </Container>
    )
}

export default Payments