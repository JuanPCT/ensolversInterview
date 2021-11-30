package com.tango.springbootmysql.repository;

import com.tango.springbootmysql.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item,Integer> {

}
