import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head, Link } from '@inertiajs/react';
import { Col, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

let dummyStudents = [
    {
        id: 1,
        name: "Bob",
        year: 3
    },
    {
        id: 2,
        name: "Steve",
        year: 1
    }
];

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
    const [showModal, setShowModal] = useState(false);
    const [newStudent, setNewStudent] = useState({
        id: Math.floor(Math.random() * 100),
        name: '',
        year: ''
    });

    const handleCloseCreateStudent = () => setShowModal(false);
    const handleShowCreateStudent = () => setShowModal(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({ ...newStudent, [name]: value });
    };

    const handleAddStudent = () => {
        // TODO JSA - Use the actual create route
        console.log("adding new student", newStudent);
        let dummyNewStudent = JSON.parse(JSON.stringify(newStudent));
        dummyStudents.push(dummyNewStudent);
        newStudent.id = Math.floor(Math.random() * 10000);
        newStudent.name = 'default';
        newStudent.year = '';
        handleCloseCreateStudent();
    }


    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="students" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <Button className="mb-2" variant="primary" onClick={handleShowCreateStudent}>Create Student</Button>
                <StudentTable studentList={dummyStudents} />

                <Modal show={showModal} onHide={handleCloseCreateStudent}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="studentName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={newStudent.name} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="studentYear">
                                <Form.Label>Year</Form.Label>
                                <Form.Control type="number" name="year" value={newStudent.year} onChange={handleInputChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCreateStudent}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddStudent}>
                            Create Student
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
