import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head, Link } from '@inertiajs/react';
import { Col, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CreateStudentForm from '@/Components/Student/CreateStudentForm';
import { Toast } from 'react-bootstrap';

export function StudentRow({ student }) {
    return (
        <tr>
            <td>{student.name}</td>
            <td>{student.year}</td>
            <td>{/* todo - add actions */}</td>
        </tr>
    );
}

export function StudentTable({ students }) {
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
            {students.map(student => 
                <StudentRow key={student.id} student={student} />
            )}
            </tbody>
        </Table>
    );
}

export default function Index({ auth, students }) {
    const { data, setData, post, processing, errors } = useForm({
        newStudent: {
            // id: Math.floor(Math.random() * 100),
            id: '',
            name: '',
            year: '',
            phone: '',
        },
    });

    const [ showModal, setShowModal ] = useState(false);
    const handleCloseCreateStudent = () => setShowModal(false);
    const handleShowCreateStudent = () => setShowModal(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData('newStudent', { ...data.newStudent, [name]: value });
    };

    const handleAddStudent = (e) => {
        e.preventDefault;
        console.log("adding new student", data.newStudent);
        post(route('students.store'), { 
            onSuccess: (response) => {
                setShowCreatedToast(true);
                setShowModal(false);
            }
        });
    }

    const [showCreatedToast, setShowCreatedToast] = useState(false);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="students" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <Button className="mb-2" variant="primary" onClick={handleShowCreateStudent}>Create Student</Button>
                <StudentTable students={students} />
                <CreateStudentForm 
                    newStudent={data.newStudent}
                    showModal={showModal}
                    processing={processing}
                    closeCallback={handleCloseCreateStudent}
                    inputChangeCallback={handleInputChange}
                    createStudentCallback={handleAddStudent}
                    errors={errors}
                />
            </div>
            <Toast
                show={showCreatedToast}
                onClose={() => setShowCreatedToast(false)}
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                }}
            >
                <Toast.Header>Success</Toast.Header>
                <Toast.Body>Student created successfully</Toast.Body>
            </Toast>
        </AuthenticatedLayout>
    );
}
