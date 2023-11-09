<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\CreateStudentRequest;



class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Students/Index', [
            // TODO - paginate
            'students' => Student::latest()->get()
        ]);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Students/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateStudentRequest $request)
    {
        $validatedData = $request->validated();

        Log::debug('Validated data', $validatedData);

        Student::create($validatedData['newStudent']);

        return redirect(route('students.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();
        return redirect(route('students.index'));
    }
}
