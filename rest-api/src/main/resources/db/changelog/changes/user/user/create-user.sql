CREATE TABLE "users"
(
    id        SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    username  VARCHAR(255) UNIQUE NOT NULL,
    password  VARCHAR(255)        NOT NULL,
    role      varchar(255) check (role in
                                  ('ROLE_ADMIN', 'ROLE_RECEIVER', 'ROLE_SPECIALIST', 'ROLE_ACCOUNTANT', 'ROLE_STAFF',
                                   'ROLE_STANDARD')),
);
