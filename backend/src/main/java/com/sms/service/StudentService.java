package com.sms.service;

import com.sms.model.Student;
import com.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.regex.Pattern;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    // ─── Validation Method ───
    private void validateStudent(Student student) {
        Map<String, String> errors = new HashMap<>();

        if (student.getFirstName() == null || student.getFirstName().trim().isEmpty()) {
            errors.put("firstName", "First name is required");
        }
        if (student.getLastName() == null || student.getLastName().trim().isEmpty()) {
            errors.put("lastName", "Last name is required");
        }
        if (student.getEmail() == null || student.getEmail().trim().isEmpty()) {
            errors.put("email", "Email is required");
        } else if (!EMAIL_PATTERN.matcher(student.getEmail()).matches()) {
            errors.put("email", "Please provide a valid email");
        }
        if (student.getDepartment() == null || student.getDepartment().trim().isEmpty()) {
            errors.put("department", "Department is required");
        }
        if (student.getYear() < 1 || student.getYear() > 6) {
            errors.put("year", "Year must be between 1 and 6");
        }

        if (!errors.isEmpty()) {
            throw new IllegalArgumentException("Validation failed: " + errors);
        }
    }

    // CREATE
    public Student createStudent(Student student) {
        validateStudent(student);
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
        validateStudent(studentDetails);
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