<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class StudentRequest extends FormRequest
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
            'name' => 'required|string',
            'year' => 'required|integer|between:1,4',
            'phone' => 'required|string'
        ];
    }

    /** Returns friendly attribute labels that can be used in the front end for error messages, etc */
    public function attributes(): array
    {
        return [
            'id' => 'ID',
            'phone' => 'Phone',
            'year' => 'Year',
            'name' => 'Name'
        ];
    }
}
