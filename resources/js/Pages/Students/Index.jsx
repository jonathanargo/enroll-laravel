import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head, Link } from '@inertiajs/react';
import Button from 'react-bootstrap/Button';
import CreateStudentForm from '@/Components/Student/CreateStudentForm';
import { Alert, Col, Row, Table } from 'react-bootstrap';
import { router } from '@inertiajs/react';

import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader
} from 'react-bs-datatable';

export default function Index({ auth, students }) {
    const { data, setData, post, processing, errors } = useForm({
        newStudent: {
            id: '',
            name: '',
            year: '',
            phone: '',
        },
    });

    const header = [
        { title: 'Name', prop: 'name', isSortable: true},
        { title: 'Year', prop: 'year', isSortable: true},
        { title: 'Actions', prop: 'actions', cell: (student) => (
            <Button variant="danger" onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
        )}
    ];

    const [ showModal, setShowModal ] = useState(false);
    const handleCloseCreateStudent = () => setShowModal(false);
    const handleShowCreateStudent = () => setShowModal(true);
    const [showCreatedMessage, setShowCreatedMessage] = useState(false);
    const [showDeletedMessage, setShowDeletedMessage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData('newStudent', { ...data.newStudent, [name]: value });
    };

    const handleAddStudent = (e) => {
        e.preventDefault;
        post(route('students.store'), { 
            onSuccess: (response) => {
                setShowCreatedMessage(true);
                setShowModal(false);
            }
        });
    };

    const handleDeleteStudent = (studentId) => {
        router.delete(route('students.destroy', studentId), {
            onSuccess: (response) => {
                setShowDeletedMessage(true);
            }
        });
    }

    function TableComponent({ students }) {
        return (
            <DatatableWrapper 
                body={students}
                headers={header}
                paginationOptionsProps={{
                    initialState: {
                      rowsPerPage: 10,
                      options: [5, 10, 15, 20]
                    }
                }}
            >
                <Row className="mb-4">
                    <Col xs={12} lg={4} className="d-flex flex-col justify-content-end align-items-start">
                        <Button variant="primary" onClick={handleShowCreateStudent}>Create Student</Button>
                    </Col>
                    
                    <Col xs={12} sm={6} lg={4} className="d-flex flex-col justify-content-end align-items-end">
                        <Pagination />
                    </Col>
                    <Col xs={12} sm={6} lg={4} className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0">
                        <PaginationOptions />
                    </Col>
                </Row>
                <Table>
                    <TableHeader />
                    <TableBody />
                </Table>
            </DatatableWrapper>
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="students" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                {showCreatedMessage && (
                    <Alert variant="success" onClose={() => setShowCreatedMessage(false)} dismissible>
                        Student created successfully
                    </Alert>
                )}
                {showDeletedMessage && (
                    <Alert variant="info" onClose={() => setShowDeletedMessage(false)} dismissible>
                        Student deleted successfully
                    </Alert>
                )}
                
                <TableComponent students={students}/>
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
        </AuthenticatedLayout>
    );
}
