import React, { useEffect, useState, useMemo } from 'react';
import {
    Container as Ctn,
    Row
} from "shards-react";
import {
    Container,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
} from 'reactstrap';
import TableContainer from './TableContainer';
import axios from "axios";
import PageTitle from "../components/common/PageTitle";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './filters';
import './Order.scss';


const ViewUsers = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        alluser();
    }, []);

    const [isuser, setuser] = useState([]);
    const alluser = async (ids) => {
        try {
            axios.get(`http://localhost:8000/essay-helpers/api/getorders.php`)
                // axios.get(`https://graduate-essay-helpers.com/api/getorders.php`)
                .then(res => {
                    console.log(res.data.orderlist.orderdata)
                    setuser(res.data.orderlist.orderdata);
                })
        } catch (error) { throw error; }
    };

    // ==============================================================


    const columns = useMemo(
        () => [
            {
                Header: 'Order No',
                accessor: 'id',
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',
            },
            {
                Header: 'User id',
                accessor: 'user_id',
            },
            {
                Header: 'Academic level',
                accessor: 'academic_level',
            },
            {
                Header: 'Deadline',
                accessor: 'deadline',
            },
            {
                Header: 'Coupon code',
                accessor: 'coupon_code',
            },
            {
                Header: 'Total',
                accessor: 'total',
            },
            {
                Header: 'Order status',
                accessor: 'order_status',
            },
            {
                Header: 'Payment status',
                accessor: 'payment_status',
            },
            {
                Header: 'Date created',
                accessor: 'created_at',
            },

        ],
        []
    );

    return (
        <Ctn fluid className="main-content-container px-4" style={{ height: '100vh' }}>
            <Container fluid className="main-content-container px-4">
                <h3 class="mb-3 text-center" style={{ display: 'flex', textAlign: 'left' }}>My Orders</h3>
                <TableContainer
                    columns={columns}
                    data={isuser}
                />
                <br />
                {/* <br />
                <h3 class="mb-3 text-center" style={{ display: 'flex', textAlign: 'left' }}>In Progress</h3>
                <TableContainer
                    columns={columns}
                    data={isuser}
                /> */}


            </Container>
            <div className="py-4">
                <h3 class="mb-3 text-center" style={{ display: 'flex', textAlign: 'left' }}>In Progress</h3>
                <table class="table border shadow">
                    <thead class="thead-primary">
                        <tr>
                            <th scope="col">Order No</th>
                            <th scope="col">Topic</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type of paper</th>
                            <th scope="col">Pages (words)</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">writer</th>
                            <th scope="col">Amount paid</th>
                            {/* <th scope="col">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>null</td>
                            <td>null</td>
                            <td>null</td>
                            <td>null</td>
                            <td>null</td>
                            <td>null</td>
                            <td>null</td>
                            <td>null</td>
                            {/* <td>null</td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </Ctn>
    )
}

export default ViewUsers