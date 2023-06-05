package com.ISCES.request;

import com.ISCES.entities.Student;
import com.unboundid.util.NotNull;
import jdk.jfr.Name;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Data
public class ApplyForCandidacyRequest {

    Student student;
    Long studentNumber;
    MultipartFile[] files;

    public ApplyForCandidacyRequest(Student student, MultipartFile[] files) {
        this.studentNumber = student.getStudentNumber();
        this.files = files;
    }


}
