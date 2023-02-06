import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col } from "shards-react";
import axios from "axios";
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../components/task-component/Table';

import PageTitle from "./../components/common/PageTitle";


const Writers = () => {

    const [data, setData] = useState([]);

    // ===========================================================

    useEffect(() => {
        window.scrollTo(0, 0);
        allwriters();
    }, []);

    const [iswriter, setwriter] = useState([]);
    const allwriters = async (ids) => {
        try {
            // axios.get(`http://localhost:8000/essay-helpers/api/getwriters.php`)
            axios.get(`https://graduate-essay-helpers.com/api/getwriters.php`)
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
            Header: "Status",
            accessor: 'status',
            Cell: StatusPill,
        },
        {
            Header: "Qualification",
            accessor: 'qualification',
            Filter: SelectColumnFilter,  // new
            filter: 'includes',
        },
        {
            Header: "Created at",
            accessor: 'created_at',
        },
    ], [])

    // const dattta = React.useMemo(() => getData(), [])

    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="Writers" subtitle="all Writers" className="text-sm-left mb-3" />
            </Row>

            <div className="min-h-screen bg-gray-100 text-gray-900">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                    {/* <div className="">
                    <h1 className="text-xl font-semibold">React Table + Tailwind CSS = ❤</h1>
                </div> */}
                    <div >
                        <Table columns={columns} data={iswriter} />
                    </div>
                </main>
            </div>


        </Container>
    )
}

export default Writers