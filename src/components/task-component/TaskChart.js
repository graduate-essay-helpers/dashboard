import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextarea,
    Button
} from "shards-react";

import CanvasJSReact from './canvasjs.react';

const TaskChart = () => {

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        // theme: "dark2", // "light1", "dark1", "dark2"
        title: {
            text: "Task Status"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: [
                { y: 20, label: "Not Started", color: "#cc99ff" },
                { y: 24, label: "In Progress", color: "#33d6ff" },
                { y: 20, label: "Awaiting Review", color: "#ffe066" },
                { y: 14, label: "On Hold", color: "#ffff4d" },
                { y: 12, label: "Completed", color: "#d2ff4d" },
                { y: 10, label: "Overdue", color: "#ffb84d" }
            ]
        }]
    }

    return (
        <Card small className="mb-4">
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        </Card>
    );
};

export default TaskChart;