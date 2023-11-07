import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import Student from '@/Components/Student';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth , students }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Students" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <p>All Students:</p>
                <div className="mt-6 bg-white shadow-sm">
                {students.map(student => 
                    <Student key={student.id} student={student} />
                )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}