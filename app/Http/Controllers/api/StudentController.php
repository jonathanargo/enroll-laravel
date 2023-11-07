<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Student;

class StudentController extends Controller
{
    /**
     * Displays all students
     * @return Collection<Student>
     */
    public function index(Request $request): Collection
    {
        return Student::all();
    }

    
    /**
     * Displays a single student
     */
    public function show($id): Student
    {
        return Student::findOrFail($id);
    }

    /** Creates a new student */
    public function store(Request $request)
    {
        // TODO - model validation and such
        $student = Student::create($request->all());
        return response()->json($student, 201);
    }
}
