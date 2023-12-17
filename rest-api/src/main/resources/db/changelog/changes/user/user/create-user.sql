create table "user"
(
    id        serial       not null,
    full_name varchar(255),
    password  varchar(255) not null,
    role      varchar(255) check (role in
                                  ('ROLE_ADMIN', 'ROLE_RECEIVER', 'ROLE_SPECIALIST', 'ROLE_ACCOUNTANT', 'ROLE_STAFF',
                                   'ROLE_STANDARD')),
    username  varchar(255) not null unique,
    primary key (id)
)