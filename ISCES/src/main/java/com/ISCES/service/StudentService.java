package com.ISCES.service;


import com.ISCES.entities.Student;
import com.ISCES.repository.StudentRepo;
import com.ISCES.request.ApplyForCandidacyRequest;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@Getter
@Setter
public class StudentService {
    private StudentRepo studentRepo;




    @Autowired
    public StudentService(StudentRepo studentRepo){
        this.studentRepo = studentRepo;
    }


    @Transactional
    public List<Student> getAllStudents(){
        return studentRepo.findAll();
    }

    @Transactional
    public Student findByStudentNumber(Long studentNumber){
        return studentRepo.findByStudentNumber(studentNumber);
    }


    @Transactional
    public Student save(Student student){
        return studentRepo.save(student);
    }

    @Transactional
    public  List<Student> findByDepartmentIdAndIsAppliedForCandidacyAndUser_Role(Long departmentId, Boolean isAppliedForCandidacy,String role){
        return studentRepo.findByDepartmentIdAndIsAppliedForCandidacyAndUser_Role(departmentId,isAppliedForCandidacy,role);
    }

    @Transactional
    public Student findByUser_Email(String email){
       return studentRepo.findByUser_Email(email);
    }

  //  @Transactional
  //  public ApplyForCandidacyRequest uploadFile(ApplyForCandidacyRequest request) throws Exception {
//
  //      Optional<Student> student= studentRepo.findById(request.getStudentNumber());
  //      if (!student.isPresent()) {
  //          throw new Exception("Student not found!");
  //      }
  //      // Create new FolderEntity and save it to the database
     // FolderEntity uploadedFolder = new FolderEntity();
     // folderRepository.save(uploadedFolder);

     // StudentEntity appliedStudent = studentEntity.get();

     // List<FileEntity> uploadedFiles = new ArrayList<>();

     // // Create a new directory for this student's files
     // String studentDir = uploadDir + "\\" + appliedStudent.getStudentNumber();  // Or any other unique identifier for the student
     // File directory = new File(studentDir);
     // if (!directory.exists()) {
     //     directory.mkdir();
     // }

     // for (MultipartFile file : request.getFiles()) {
     //     try {
     //         // Save file to disk
     //         Path filePath = Paths.get(studentDir, file.getOriginalFilename());
     //         file.transferTo(filePath.toFile());

     //         // Create new FileEntity and associate it with the folder
     //         FileEntity uploadedFile = new FileEntity();
     //         uploadedFile.setFilePath(filePath.toString());
     //         uploadedFile.setFolder(uploadedFolder);
     //         uploadedFiles.add(uploadedFile);
     //     } catch (IOException e) {
     //         e.printStackTrace();
     //         ApplyForCandidacyResponse response = ApplyForCandidacyResponse.builder()
     //                 .isFolderSaved(false)
     //                 .isDepartmentChairApproved(false)
     //                 .build();
     //         return response;
     //     }
     // }

     // uploadedFolder.setFiles(uploadedFiles);
     // uploadedFolder.setStudent(appliedStudent);
     // folderRepository.save(uploadedFolder);

     // ApplyForCandidacyResponse response = ApplyForCandidacyResponse.builder()
     //         .isFolderSaved(true)
     //         .isDepartmentChairApproved(false)
     //         .build();

     // // Send the student's folder to department chair within the student information.
     // notifyDepartmentChair(appliedStudent, uploadedFolder, response);

     // return response;
   // }
}
