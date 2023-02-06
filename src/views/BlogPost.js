import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Badge,
    Button
} from "shards-react";

import Grid from './file_components/grid/Grid';
import Navbar from './file_components/navbar/Navbar';
import List from './file_components/list/List';

import PageTitle from "../components/common/PageTitle";

const BlogPost = () => {
    const [list, setList] = useState(false);
    return (
        <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <Col>
                    <PageTitle sm="4" title="Blog Posts" subtitle="" className="text-sm-left" />
                </Col>
                <Col>
                    <Navbar list={list} setList={setList} />
                </Col>

            </Row>

            <Row>
                <div>
                    {list ? <List /> : <Grid />}
                </div>
            </Row>


        </Container>
    )
}

export default BlogPost