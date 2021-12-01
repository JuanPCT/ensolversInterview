package com.tango.springbootmysql.repository;

import com.tango.springbootmysql.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder,Integer> {
}
