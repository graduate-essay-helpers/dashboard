import React, { useEffect, useState, useMemo } from 'react';
import {
    Container,
    Row
} from "shards-react";
import {
    Container as Cnt,
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


const ViewUsers = () => {
    const [data, setData] = useState([]);

    // ===========================================================

    useEffect(() => {
        window.scrollTo(0, 0);
        alluser();
    }, []);

    const [isuser, setuser] = useState([]);
    const alluser = async (ids) => {
        try {
            // axios.get(`http://localhost:8000/essay-helpers/api/getusers.php`)
            axios.get(`https://graduate-essay-helpers.com/api/getusers.php`)
                .then(res => {
                    console.log(res.data.userlist.userdata)
                    setuser(res.data.userlist.userdata);
                })
        } catch (error) { throw error; }
    };

    // ==============================================================


    const columns = useMemo(
        () => [
            // {
            //     Header: () => null,
            //     id: 'expander', // 'id' is required
            //     Cell: ({ row }) => (
            //         <span {...row.getToggleRowExpandedProps()}>
            //             {row.isExpanded ? '👇' : '👉'}
            //         </span>
            //     ),
            // },
            {
                Header: 'Id',
                accessor: 'id',
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',
            },
            {
                Header: 'Name',
                accessor: 'first_name',
            },
            // {
            //     Header: 'Last Name',
            //     accessor: 'name.last',
            // },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Email verified',
                accessor: '',
            },
            {
                Header: 'date',
                accessor: 'created_at',
            },

        ],
        []
    );

    return (
        <Container fluid className="main-content-container px-4">
            <h3>User Management</h3>
            <Row noGutters className="page-header py-4">
                <PageTitle title="User List" subtitle="" className="text-sm-left mb-3" />
            </Row>
            <TableContainer
                columns={columns}
                data={isuser}
            // renderRowSubComponent={renderRowSubComponent}
            />
        </Container>
    )
}

export default ViewUsers