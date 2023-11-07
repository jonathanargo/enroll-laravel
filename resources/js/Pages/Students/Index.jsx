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
            <div>
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