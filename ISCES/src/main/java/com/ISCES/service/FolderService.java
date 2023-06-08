package com.ISCES.service;

import com.ISCES.entities.Folder;
import com.ISCES.repository.FolderRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
@Service
public class FolderService {
    private FolderRepo folderRepo;

    public FolderService(FolderRepo folderRepo) {
        this.folderRepo = folderRepo;
    }


    public Folder findByStudent_StudentNumber(Long studentNumber) {
        return folderRepo.findByStudent_StudentNumber(studentNumber);
    }
}
