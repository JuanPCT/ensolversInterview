package com.tango.springbootmysql.controller;

import com.tango.springbootmysql.entity.Item;
import com.tango.springbootmysql.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ItemController {

    @Autowired
    private ItemService service;

    //~ENDPOINTS

    @PostMapping("/addItem")
    public Item addItem(@RequestBody Item item){
        return service.saveItem(item);
    }

    @PostMapping("/addItems")
    public List<Item> addItems(@RequestBody List<Item> items){
        return service.saveItems(items);
    }

    @GetMapping("/items")
    public List<Item> findAllItems(){
        return service.getItems();
    }

    @GetMapping("/item/{id}")
    public Item findItemById(@PathVariable int id){
        return service.getItemById(id);
    }

    @PutMapping("/update")
    public Item updateItem(@RequestBody Item item){
        return service.updateItem(item);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteItem(@PathVariable int id){
        return service.deleteItem(id);
    }


}
