<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
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

    
    /** Displays a single student */
    public function show($id): Student
    {
        return Student::findOrFail($id);
    }

    /** Creates a new student */
    public function store(Request $request): JsonResponse
    {
        // TODO - model validation and such
        $student = Student::create($request->all());
        return response()->json($student, 201);
    }

    /** Updates a student */
    public function update(Request $request, Student $student): JsonResponse
    {
        // TODO - model validation
        $student->update($request->all());
        return response()->json($student, 200);
    }

    /** Deletes a student */
    public function delete(Student $student)
    {
        $student->delete();
        return response()->json(null, 204);
    }
}
