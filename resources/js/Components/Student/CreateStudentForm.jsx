import React from 'react';

import InputMask from 'react-input-mask';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputError from '@/Components/InputError';

export default function CreateStudentForm({ newStudent, showModal, processing, closeCallback, inputChangeCallback, createStudentCallback, errors}) {
    return (
        <Modal show={showModal} onHide={closeCallback}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="studentName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={newStudent.name} onChange={inputChangeCallback} />
                        <InputError message={errors['newStudent.name']} className="mt-2" />
                    </Form.Group>
                    <Form.Group controlId="studentYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" name="year" value={newStudent.year} onChange={inputChangeCallback} />
                        <InputError message={errors['newStudent.year']} className="mt-2" />
                    </Form.Group>
                    <Form.Group controlId="studentPhone">
                        <Form.Label>Phone</Form.Label>
                        <InputMask
                            mask="(999) 999-9999"
                            maskChar="_"
                            value={newStudent.phone}
                            onChange={inputChangeCallback}
                        >
                        {() => <Form.Control type="text" name="phone" />}
                        </InputMask>
                        <InputError message={errors['newStudent.phone']} className="mt-2" />
                    </Form.Group>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeCallback}>
                    Close
                </Button>
                <Button variant="primary" disabled={processing} onClick={createStudentCallback}>
                    Create Student
                </Button>
            </Modal.Footer>
        </Modal>
    );
}