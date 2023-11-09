<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'newStudent.name' => 'required|string',
            'newStudent.year' => 'required|integer|between:1,4',
            'newStudent.phone' => 'required|string'
        ];
    }

    /** Returns friendly attribute labels that can be used in the front end for error messages, etc */
    public function attributes(): array
    {
        return [
            'newStudent.phone' => 'Phone',
            'newStudent.year' => 'Year',
            'newStudent.name' => 'Name'
        ];
    }
}
