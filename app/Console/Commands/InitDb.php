<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Student;

class InitDb extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:init-db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->cleanup();
        $this->createStudents();
    }

    /** Purges all test data */
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
