import React from 'react'
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from './Table'  // new

const getData = () => {
    const data = [
        {
            name: 'Jane Cooper',
            email: 'jane.cooper@example.com',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            status: 'Completed',
            role: 'Admin',
            age: 27,
            progress: "",
            start: "",
            due: "",
            notes: "",
            imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Cody Fisher',
            email: 'cody.fisher@example.com',
            title: 'Product Directives Officer',
            department: 'Intranet',
            status: 'In Progress',
            role: 'Owner',
            age: 43,
            progress: "",
            start: "",
            due: "",
            notes: "",
            imgUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Esther Howard',
            email: 'esther.howard@example.com',
            title: 'Forward Response Developer',
            department: 'Directives',
            status: 'awaiting review',
            role: 'Member',
            age: 32,
            progress: "",
            start: "",
            due: "",
            notes: "",
            imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jenny Wilson',
            email: 'jenny.wilson@example.com',
            title: 'Central Security Manager',
            department: 'Program',
            status: 'overdue',
            role: 'Member',
            age: 29,
            progress: "",
            start: "",
            due: "",
            notes: "",
            imgUrl: 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Kristin Watson',
            email: 'kristin.watson@example.com',
            title: 'Lean Implementation Liaison',
            department: 'Mobility',
            status: 'On Hold',
            role: 'Admin',
            age: 36,
            progress: "",
            start: "",
            due: "",
            notes: "",
            imgUrl: 'https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Cameron Williamson',
            email: 'cameron.williamson@example.com',
            title: 'Internal Applications Engineer',
            department: 'Security',
            status: 'awaiting review',
            role: 'Member',
            age: 24,
            progress: "",
            start: "",
            due: "",
            notes: "",
            imgUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
    ]
    return [...data, ...data, ...data]
}

const TaskTable = () => {

    const columns = React.useMemo(() => [
        {
            Header: "Name",
            accessor: 'name',
            Cell: AvatarCell,
            imgAccessor: "imgUrl",
            emailAccessor: "email",
        },
        {
            Header: "Title",
            accessor: 'title',
        },
        {
            Header: "Status",
            accessor: 'status',
            Cell: StatusPill,
            Filter: SelectColumnFilter,  // new
            filter: 'includes',
        },
        {
            Header: "Progress",
            accessor: 'progress',
        },
        {
            Header: "Start Date",
            accessor: 'start',
        },
        {
            Header: "Due Date",
            accessor: 'due',
        },
        {
            Header: "Notes",
            accessor: 'notes',
        },
    ], [])

    const data = React.useMemo(() => getData(), [])

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                {/* <div className="">
                    <h1 className="text-xl font-semibold">React Table + Tailwind CSS = ❤</h1>
                </div> */}
                <div >
                    <Table columns={columns} data={data} />
                </div>
            </main>
        </div>
    )
}

export default TaskTable