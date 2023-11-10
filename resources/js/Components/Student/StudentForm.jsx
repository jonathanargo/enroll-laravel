import React from 'react';

import InputMask from 'react-input-mask';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputError from '@/Components/InputError';

export default function CreateStudentForm({ formMode, student, showModal, processing, closeCallback, inputChangeCallback, createStudentCallback, editStudentCallback, errors}) {
    let modalTitle = 'Add New Student';
    if (formMode === 'edit') {
        modalTitle = 'Edit Student';
    }

    let callback = createStudentCallback;
    if (formMode === 'edit') {
        callback = editStudentCallback;
    }

    return (
        <Modal show={showModal} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="studentId">
                        <Form.Control type="hidden" name="id" value={student.id} />
                    </Form.Group>
                    <Form.Group controlId="studentName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={student.name} onChange={inputChangeCallback} />
                        <InputError message={errors['name']} className="mt-2" />
                    </Form.Group>
                    <Form.Group controlId="studentYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" name="year" value={student.year} onChange={inputChangeCallback} />
                        <InputError message={errors['year']} className="mt-2" />
                    </Form.Group>
                    <Form.Group controlId="studentPhone">
                        <Form.Label>Phone</Form.Label>
                        <InputMask
                            mask="(999) 999-9999"
                            maskChar="_"
                            value={student.phone}
                            onChange={inputChangeCallback}
                        >
                        {() => <Form.Control type="text" name="phone" />}
                        </InputMask>
                        <InputError message={errors['phone']} className="mt-2" />
                    </Form.Group>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeCallback}>
                    Close
                </Button>
                <Button variant="primary" disabled={processing} onClick={callback}>
                    { formMode === "create" ? 'Create Student' : 'Save' }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}