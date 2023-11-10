<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Log;

class EditStudentRequest extends StudentRequest
{
    // Adds the ID required field
    public function rules(): array
    {
        $rules = array_merge([
            'id' => 'required|integer'
        ], parent::rules());

        // TODO JSA - Remove log
        Log::info('Validation rules on edit student', $rules);
        return $rules;
    }

    /** Returns friendly attribute labels that can be used in the front end for error messages, etc */
    public function attributes(): array
    {
        return [
            'phone' => 'Phone',
            'year' => 'Year',
            'name' => 'Name'
        ];
    }
}
