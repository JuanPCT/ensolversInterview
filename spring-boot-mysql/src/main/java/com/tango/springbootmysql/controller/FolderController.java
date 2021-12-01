package com.tango.springbootmysql.controller;

import com.tango.springbootmysql.entity.Folder;
import com.tango.springbootmysql.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class FolderController {

    @Autowired
    private FolderService service;

    //~ENDPOINTS

    @PostMapping("/addFolder")
    public Folder addItem(@RequestBody Folder folder){
        return service.saveFolder(folder);
    }

    @PostMapping("/addFolders")
    public List<Folder> addItems(@RequestBody List<Folder> folders){
        return service.saveFolders(folders);
    }

    @GetMapping("/folders")
    public List<Folder> findAllItems(){
        return service.getFolders();
    }

    @GetMapping("/folder/{id}")
    public Folder findItemById(@PathVariable int id){
        return service.getFolderById(id);
    }

    @PutMapping("/updateFolder")
    public Folder updateItem(@RequestBody Folder folder){
        return service.updateFolder(folder);
    }

    @DeleteMapping("/deleteFolder/{id}")
    public String deleteItem(@PathVariable int id){
        return service.deleteFolder(id);
    }
}
