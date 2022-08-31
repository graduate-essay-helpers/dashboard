import React from 'react'
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";

const UploadWork = () => {
    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="Work uploads" subtitle="" className="text-sm-left mb-3" />
            </Row>
        </Container>

    )
}

export default UploadWork