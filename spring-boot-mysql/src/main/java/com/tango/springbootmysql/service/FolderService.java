package com.tango.springbootmysql.service;

import com.tango.springbootmysql.entity.Folder;
import com.tango.springbootmysql.repository.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {
    @Autowired
    private FolderRepository repository;

    public Folder saveFolder(Folder folder){
        return repository.save(folder);
    }

    public List<Folder> saveFolders(List<Folder> folders){
        return repository.saveAll(folders);
    }

    public List<Folder> getFolders(){
        return repository.findAll();
    }

    public Folder getFolderById(int id){
        return repository.findById(id).orElse(null);
    }

    public String deleteFolder(int id){
        repository.deleteById(id);
        return "Deleted Folder with ID: " + id;
    }

    public Folder updateFolder(Folder folder){
        Folder existingFolder = repository.findById(folder.getId()).orElse(null);
        existingFolder.addItems(folder.getItems());
        return repository.save(existingFolder);
    }

}
