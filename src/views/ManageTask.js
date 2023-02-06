import React from 'react';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";

// import './ManageTask.css';
import TaskChart from '../components/task-component/TaskChart';
import TaskGraph from '../components/task-component/TaskGraph';
import TaskTable from '../components/task-component/TaskTable';

const ManageTask = () => {
    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="Task Management" subtitle="Manage task/order" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            <Row>
                <Col lg="6">
                    <TaskChart />
                </Col>
                <Col lg="6">
                    <TaskGraph />
                </Col>
            </Row>
            <Row>
                <TaskTable />
            </Row>
        </Container>
    );
};

export default ManageTask;