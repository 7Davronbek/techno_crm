package com.example.technocrm.client;

import com.example.technocrm.client.entity.Client;
import com.example.technocrm.client.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    List<Client> findAllByStatus(Status status);

    Optional<Client> findClientByStatus(Status status);
}
