import React from 'react';
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";

const Writers = () => {
    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="Total bids" subtitle="" className="text-sm-left mb-3" />
            </Row>

            <div className="py-4">
                <h3 class="mb-3 text-center" style={{ display: 'flex', textAlign: 'left' }}>In Progress</h3>
                <table class="table border shadow">
                    <thead class="thead-primary">
                        <tr>
                            <th scope="col">Writer</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Price</th>
                            <th scope="col">Preview</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ display: 'flex', gap: '5px' }}>
                                <thead>
                                    <tr>img</tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        name
                                    </tr>
                                    <tr>
                                        completed
                                    </tr>
                                </tbody>
                            </td>
                            <td>null</td>
                            <td>null</td>
                            <td>null</td>
                            <td>null</td>
                            <td>null</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="table border shadow">
                <h6>You may request a writer to provide short previews for the order so you can check their writer skills</h6>
            </div>
        </Container>
    )
}

export default Writers