<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $this->cleanup();
        $this->createStudents();
    }

    private function cleanup()
    {
        foreach (Student::all() as $student) {
            $student->delete();
        }
    }

    /** Inserts students */
    private function createStudents()
    {
        Student::create([
            'name' => 'Morty Smith',
            'year' => 2,
            'phone' => '5551234567'
        ]);

        Student::create([
            'name' => 'Rick Sanchez',
            'year' => 4,
            'phone' => '5551234567'
        ]);

        Student::create([
            'name' => 'Jerry Smith',
            'year' => 3,
            'phone' => '5551234567'
        ]);
    }
}
