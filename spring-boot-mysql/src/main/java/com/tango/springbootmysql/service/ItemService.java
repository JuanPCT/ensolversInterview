package com.tango.springbootmysql.service;


import com.tango.springbootmysql.entity.Item;
import com.tango.springbootmysql.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository repository;

    public Item saveItem(Item item){
        return repository.save(item);
    }

    public List<Item> saveItems(List<Item> items){
        return repository.saveAll(items);
    }

    public List<Item> getItems(){
        return repository.findAll();
    }

    public Item getItemById(int id){
        return repository.findById(id).orElse(null);
    }

    public String deleteItem(int id){
        repository.deleteById(id);
        return "Deleted Item with ID: " + id;
    }

    public Item updateItem(Item item){
        Item existingItem = repository.findById(item.getId()).orElse(null);
        existingItem.setName(item.getName());
        return repository.save(existingItem);
    }


}
