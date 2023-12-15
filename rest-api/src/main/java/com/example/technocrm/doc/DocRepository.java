package com.example.technocrm.doc;

import com.example.technocrm.doc.entity.Doc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocRepository extends JpaRepository<Doc, Integer> {
}
