import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head, Link } from '@inertiajs/react';
import Button from 'react-bootstrap/Button';
import CreateStudentForm from '@/Components/Student/CreateStudentForm';
import StudentForm from '@/Components/Student/StudentForm';
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

{ /* TODO JSA - Need to implement generic success/failure messages*/ }
export default function Index({ auth, students }) {
    const defaultNewStudent = {
        id: '',
        name: '',
        phone: '',
        year: '',
    };

    const { data, setData, post, patch, processing, errors, clearErrors } = useForm({
        ... defaultNewStudent
    });

    const header = [
        { title: 'Name', prop: 'name', isSortable: true},
        { title: 'Year', prop: 'year', isSortable: true},
        { title: 'Actions', prop: 'actions', cell: (student) => (
            <>
                <Button variant="secondary" onClick={() => showEditForm(student)} className="mr-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
            </>
        )}
    ];

    const [ showModal, setShowModal ] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [showAlertMessage, setShowAlertMessage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // Event handler for actually storing the student in the DB
    const handleAddStudent = (e) => {
        e.preventDefault;
        debugger;
        post(route('students.store'), { 
            onSuccess: (response) => {
                displayAlert('success', 'Student created successfully');
                setShowModal(false);
                clearErrors(); // Shouldn't have any errors but just in case...
            }
        });
    };

    const handleEditStudent = (e) => {
        e.preventDefault;
        debugger;
        patch(route('students.update', data.id), { 
            onSuccess: () => {
                displayAlert('success', 'Student updated');
                setShowModal(false);
                clearErrors();
            }
        });
    }

    // Event handler for deleting a student from the DB.
    const handleDeleteStudent = (studentId) => {
        router.delete(route('students.destroy', studentId), {
            onSuccess: (response) => {
                displayAlert('info', 'Student deleted')
            }
        });
    }

    // Callback for closing the student form.
    const handleCloseStudentForm = () => {
        setShowModal(false);
        clearErrors();
    }

    const showCreateForm = () => {
        setData({ ...defaultNewStudent });
        setFormMode('create');
        setShowModal(true);
    }

    const showEditForm = (student) => {
        setData({ ...student });
        setFormMode('edit');
        setShowModal(true);
    }

    // Displays an alert with a message. Used for success/failure messages
    const displayAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlertMessage(true);
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
                        <Button variant="primary" onClick={showCreateForm}>Create Student</Button>
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
            <Head title="Students" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                {showAlertMessage && (
                    <Alert variant={alertType} onClose={() => setShowAlertMessage(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                
                <TableComponent students={students}/>
                <StudentForm 
                    formMode={formMode}
                    student={data}
                    showModal={showModal}
                    processing={processing}
                    closeCallback={handleCloseStudentForm}
                    inputChangeCallback={handleInputChange}
                    createStudentCallback={handleAddStudent}
                    editStudentCallback={handleEditStudent}
                    errors={errors}
                />
            </div>
        </AuthenticatedLayout>
    );
}
