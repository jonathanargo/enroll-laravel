import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Student from '@/Components/Student';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader
  } from 'react-bs-datatable';
import { Col, Row, Table } from 'react-bootstrap';
  
import 'bootstrap/dist/css/bootstrap.min.css';

const header = [
    { title: 'Name', prop: 'name', isSortable: true},
    { title: 'Year', prop: 'year', isSortable: true}
];

function TableComponent({students}) {
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
                <Col xs={12} lg={4} className="d-flex flex-col justify-content-end align-items-end">
                    <Filter />
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
}

export default function Index({ auth , students }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Students" />
            <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
                <TableComponent students={students}/>
            </div>
        </AuthenticatedLayout>
    );
}