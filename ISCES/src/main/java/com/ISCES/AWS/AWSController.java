package com.ISCES.AWS;

import com.amazonaws.services.apigateway.model.Model;
import com.amazonaws.services.s3.model.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
public class AWSController {
    @Autowired
    private AWSService awsService;

/*
    @GetMapping("/objects")
    public List<S3ObjectSummary> listObjects(){
        return awsService.listObjects();
    }
*//*
    @GetMapping("/downloadDocument/{studentNumber}")
    public List<S3Object> listObjects(@PathVariable Long studentNumber){
        return awsService.downloadDocument(studentNumber);
    }*/



    @PostMapping("/uploadDocument/{studentNumber}")
    public Boolean uploadDocument(
            @PathVariable("studentNumber") Long studentNumber,
            @RequestParam("transcript") MultipartFile transcript,
            @RequestParam("criminal") MultipartFile criminal
    ) {
        try {
            List<MultipartFile> multipartFiles = new ArrayList<>();
            multipartFiles.add(transcript);
            multipartFiles.add(criminal);
            awsService.uploadDocument(multipartFiles, studentNumber);
        } catch (IOException e) {
            e.printStackTrace();
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }


    //Burada değişecek bir şeye ihtiyaç yok
    @GetMapping("/downloadDocument/{studentNumber}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable("studentNumber") Long studentNumber) {
        try {
            return awsService.downloadDocument(studentNumber);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/deneme")
    public ObjectListing  deneme(){
        awsService.deleteFolders();
        return awsService.checkList();
    }

    @GetMapping("/folders")
    public ObjectListing list(){
        return awsService.checkList();
    }
}
