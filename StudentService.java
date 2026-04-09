package com.sms.service;

import com.sms.model.Student;
import com.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // CREATE
    public Student createStudent(Student student) {
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new IllegalArgumentException("Student with email " + student.getEmail() + " already exists");
        }
        return studentRepository.save(student);
    }

    // READ ALL
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // READ BY ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Student not found with id: " + id));
    }

    // UPDATE
    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);

        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setEmail(studentDetails.getEmail());
        student.setDepartment(studentDetails.getDepartment());
        student.setYear(studentDetails.getYear());
        student.setPhoneNumber(studentDetails.getPhoneNumber());
        student.setAddress(studentDetails.getAddress());

        return studentRepository.save(student);
    }

    // DELETE
    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }

    // SEARCH
    public List<Student> searchStudents(String query) {
        return studentRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(query, query);
    }

    // FILTER BY DEPARTMENT
    public List<Student> getStudentsByDepartment(String department) {
        return studentRepository.findByDepartment(department);
    }
}
