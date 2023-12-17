-- Table: client
CREATE TABLE client
(
    act                  BOOLEAN NOT NULL,
    correction_passport  BOOLEAN NOT NULL,
    dd                   BOOLEAN NOT NULL,
    dr                   BOOLEAN NOT NULL,
    dt                   BOOLEAN NOT NULL,
    emergency_situations BOOLEAN NOT NULL,
    gas_passport         BOOLEAN NOT NULL,
    id                   int generated AS IDENTITY NOT NULL,
    is_paid              BOOLEAN NOT NULL,
    last_verification    BOOLEAN NOT NULL,
    mechanical_damage    BOOLEAN NOT NULL,
    technical_condition  BOOLEAN NOT NULL,
    visual_damage        BOOLEAN NOT NULL,
    created_at           TIMESTAMP(6),
    conclusions          VARCHAR(255),
    counting_mechanism   VARCHAR(255),
    date                 VARCHAR(255),
    indications          VARCHAR(255),
    mark                 VARCHAR(255),
    org_name             VARCHAR(255),
    phone_number         VARCHAR(255),
    serial_number        VARCHAR(255),
    status               VARCHAR(255) CHECK (status IN (
                                                        'RECEIVER', 'SPECIALIST', 'ACCOUNTANT', 'PAYMENT', 'STAFF',
                                                        'TEST',
                                                        'DOCS', 'END')),
    temperature          VARCHAR(255),
    PRIMARY KEY (id)
);

-- Table: doc
CREATE TABLE doc
(
    client_id  INTEGER,
    id         int generated AS IDENTITY NOT NULL,
    image_url1 VARCHAR(255),
    image_url2 VARCHAR(255),
    image_url3 VARCHAR(255),
    image_url4 VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (client_id) REFERENCES client
);

-- Table: history
CREATE TABLE history
(
    client_id  INTEGER,
    id         int generated AS IDENTITY NOT NULL,
    user_id    INTEGER,
    updated_at TIMESTAMP(6),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user",
    FOREIGN KEY (client_id) REFERENCES client
);

-- Table: tool
CREATE TABLE tool
(
    arrival_time  DATE,
    client_id     INTEGER,
    count         INTEGER,
    id            int generated AS IDENTITY NOT NULL,
    price         INTEGER,
    cipher_number VARCHAR(255),
    name          VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (client_id) REFERENCES client
);

-- Table: "user"
CREATE TABLE "user"
(
    id        int generated AS IDENTITY NOT NULL,
    full_name VARCHAR(255),
    password  VARCHAR(255) NOT NULL,
    role      VARCHAR(255) CHECK (role IN (
                                           'ROLE_ADMIN', 'ROLE_RECEIVER', 'ROLE_SPECIALIST', 'ROLE_ACCOUNTANT',
                                           'ROLE_STAFF',
                                           'ROLE_STANDARD')),
    username  VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);
