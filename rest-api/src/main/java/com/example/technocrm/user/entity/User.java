package com.example.technocrm.user.entity;

import com.example.technocrm.client.entity.Client;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "`user`")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String fullName;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private LocalDate created;
    private boolean isActive;

//    @ManyToMany
//    @JoinTable(
//            name = "user_client",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "client_id")
//    )
//    private List<Client> clients;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Client> clients;
}
