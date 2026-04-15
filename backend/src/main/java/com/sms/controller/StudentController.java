package com.sms.controller;

import com.sms.model.Student;
import com.sms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/api/students")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/api/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/api/students/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    @PutMapping("/api/students/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Student updated = studentService.updateStudent(id, student);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/api/students/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/students/search")
    public ResponseEntity<List<Student>> searchStudents(@RequestParam String query) {
        List<Student> students = studentService.searchStudents(query);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/api/students/department/{department}")
    public ResponseEntity<List<Student>> getByDepartment(@PathVariable String department) {
        List<Student> students = studentService.getStudentsByDepartment(department);
        return ResponseEntity.ok(students);
    }
}