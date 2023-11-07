import React from 'react';

export default function Student({ student }) {
    return (
        <div className="p-6 flex space-x-2">
            <div className="flex-1">
                <span className="text-gray-900 txt-lg">{student.name}</span>
            </div>
        </div>
    );
}