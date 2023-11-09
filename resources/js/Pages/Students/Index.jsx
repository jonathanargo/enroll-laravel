import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head, Link } from '@inertiajs/react';
import { Col, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CreateStudentForm from '@/Components/Student/CreateStudentForm';

const dummyStudents = [
    {
        id: 1,
        name: "Test Student 1",
        year: 3,
        phone: "1234567890"
    },
    {
        id: 2,
        name: "Test Student 2",
        year: 2,
        phone: "1234567890"
    }
]


export function StudentRow({ student }) {
    return (
        <tr>
            <td>{student.name}</td>
            <td>{student.year}</td>
            <td>{/* todo - add actions */}</td>
        </tr>
    );
}

export function StudentTable({ studentList }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Year</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {studentList.map(student => 
                <StudentRow key={student.id} student={student} />
            )}
            </tbody>
        </Table>
    );
}

export default function Index({ auth, students }) {
    const { data, setData, post, processing, errors } = useForm({
        showModal: false,
        newStudent: {
            id: Math.floor(Math.random() * 100),
            name: '',
            year: '',
            phone: '',
        },
    });

    const handleCloseCreateStudent = () => setData('showModal', false);
    const handleShowCreateStudent = () => setData('showModal', true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData('newStudent', { ...data.newStudent, [name]: value });
    };

    const handleAddStudent = () => {
        // TODO JSA - Use the actual create route
        console.log("adding new student", data.newStudent);
        let dummyNewStudent = JSON.parse(JSON.stringify(data.newStudent));
        dummyStudents.push(dummyNewStudent);
        setData('newStudent', {
            id: Math.floor(Math.random() * 10000),
            name: '',
            year: '',
            phone: ''
        });
        handleCloseCreateStudent();
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="students" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <Button className="mb-2" variant="primary" onClick={handleShowCreateStudent}>Create Student</Button>
                <StudentTable studentList={dummyStudents} />
                <CreateStudentForm 
                    newStudent={data.newStudent}
                    showModal={data.showModal}
                    closeCallback={handleCloseCreateStudent}
                    inputChangeCallback={handleInputChange}
                    createStudentCallback={handleAddStudent}
                />
            </div>
        </AuthenticatedLayout>
    );
}
