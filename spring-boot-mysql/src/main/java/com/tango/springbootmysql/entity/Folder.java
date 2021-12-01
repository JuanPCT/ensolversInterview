package com.tango.springbootmysql.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "FOLDER_TBL")
public class Folder {

    @Id
    @GeneratedValue
    private int id;
    private String name;

    public void addItems(List<Item> items) {
        this.items.addAll(items);
    }

    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<Item> items = new ArrayList();
}
