import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col } from "shards-react";
import axios from "axios";
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../components/task-component/Table';

import PageTitle from "./../components/common/PageTitle";
import { CheckBox } from '@mui/icons-material';

import AssignForm from '../components/assign-components/AssignForm';
import Details from '../components/assign-components/Details';


const Assign = () => {

    const [data, setData] = useState([]);

    // ===========================================================

    useEffect(() => {
        window.scrollTo(0, 0);
        allwriters();
    }, []);

    const [iswriter, setwriter] = useState([]);
    const allwriters = async (ids) => {
        try {
            // axios.get(`http://localhost:8000/essay-helpers/api/assignwriter.php`)
            axios.get(`https://graduate-essay-helpers.com/api/assignwriter.php`)
                .then(res => {
                    console.log(res.data.writerslist.writerdata)
                    setwriter(res.data.writerslist.writerdata);
                })
        } catch (error) { throw error; }
    };

    const columns = React.useMemo(() => [
        {
            Header: "Name",
            accessor: 'name',
            Cell: AvatarCell,
            imgAccessor: "imgUrl",
            emailAccessor: "email",
        },
        {
            Header: "Email Status",
            accessor: 'status',
            Cell: StatusPill,
        },
        {
            Header: "% Qualification",
            accessor: 'qualification',
        },
        {
            Header: "Academic Level",
            accessor: 'ac_level',
            Filter: SelectColumnFilter,  // new
            filter: 'includes',
        },
    ], [])


    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="Assign" subtitle="Order Assignment" className="text-sm-left mb-3" />
            </Row>
            <Row>
                <Col lg="6">
                    <AssignForm />
                </Col>
                <Col lg="6">
                    <Details />
                </Col>
            </Row>

            <div className="min-h-screen bg-gray-100 text-gray-900">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

                    <div >
                        <Table columns={columns} data={iswriter} />
                    </div>
                </main>
            </div>
        </Container>
    );
};

export default Assign;