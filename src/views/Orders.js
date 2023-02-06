import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Container as Ctn,
    Row,
    Col,
    Form,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextarea,
    Button
} from "shards-react";
import {
    Container,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    // Button
} from 'reactstrap';
import TableContainer from './TableContainer';
import axios from "axios";
import PageTitle from "../components/common/PageTitle";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './filters';

import { useParams } from 'react-router-dom';
// import './Order.css';


const ViewUsers = (props) => {

    const id_ord = useRef();

    useEffect(() => {
        window.scrollTo(0, 0);
        alluser();
    }, []);

    console.log(props.match)

    const taskRef = useRef();

    const [orderId, setOrderId] = useState([]);

    const [isuser, setuser] = useState([]);
    taskRef.current = isuser;
    const alluser = async (ids) => {
        try {
            // axios.get(`http://localhost:8000/essay-helpers/api/getorders.php`)
            axios.get(`https://graduate-essay-helpers.com/api/getorders.php`)
                .then(res => {
                    // console.log(res.data.orderlist.orderdata)
                    setuser(res.data.orderlist.orderdata);
                })
        } catch (error) { throw error; }
    };


    const handleChange = event => {
        setOrderId(event.target.value);
    };

    const openTask = (rowIndex) => {
        const id = taskRef.current[rowIndex].id;

        // 👇️ set value of input field
        setOrderId(id);

        // let one = "http://localhost:8000/essay-helpers/api/getorder.php";
        // let two = "http://localhost:8000/essay-helpers/api/getfiles.php";

        let one = "https://graduate-essay-helpers.com/api/getorder.php";
        let two = "https://graduate-essay-helpers.com/api/getfiles.php";

        const requestOne = axios.post(one, { ord_id: id });

        const requestTwo = axios.post(two, { ord_id: id });

        // axios.post(`http://localhost:8000/essay-helpers/api/getfiles.php`, {
        //     ord_id: id,
        // })
        //     .then(response => {
        //         console.log(response);
        //         console.log(props);
        //     })

        axios.all([requestOne, requestTwo])
            .then(axios.spread((...res) => {
                const resOne = res[0]
                const resTwo = res[1]
                console.log(resOne);
                console.log(resTwo);
                console.log(res);
                if (res[1].data.success === true) {
                    props.history.push({ pathname: "/assign/", search: "?id=" + id, state: { rowIndex: res[0].data.orderlist.orderdata, files: res[1].data.filelist.filedata } });
                }
                else {
                    props.history.push({ pathname: "/assign/", search: "?id=" + id, state: { rowIndex: res[0].data.orderlist.orderdata } });
                }
                return;
            }))


        // props.history.push({ pathname: "/assign/", search: "?id=" + id, state: { rowIndex: rowIndex } });
    }

    console.log(isuser);

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
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Deadline',
                accessor: 'deadline',
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
                Header: 'Action',
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <Button
                                name="assign_btn"
                                id="assign_btn"
                                onClick={() => openTask(rowIdx)}
                            >
                                {props.row.original.order_status === "ASSIGNED" ? <>Assigned</> : props.row.original.order_status === "DELIVERED" ? <>DELIVERED</> : <>Assign</>}
                            </Button>
                        </div>
                    )
                },
                // Cell: (props) => {
                //     // const rowIdx = props.row.id;
                //     const rowIdx = props.row.original.id;
                //     // const ord_id = openTask(rowIdx);
                //     console.log(props.row.original.id);
                //     return (<div><Link to={`/assign/${rowIdx}`}><Button className="btn" theme="success">Assign</Button></Link></div>)
                // }
                // Cell: (indRow) => {
                //     // const dev = id_ord.current[indRow].id;
                // }
            },
            {
                Header: 'Date created',
                accessor: 'created_at',
            },

        ],
        []
    );

    return (
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
    )
}

export default ViewUsers;