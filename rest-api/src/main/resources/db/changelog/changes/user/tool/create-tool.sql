create table tool
(
    arrival_time  date,
    client_id     integer,
    count         integer,
    id            serial not null,
    price         integer,
    cipher_number varchar(255),
    name          varchar(255),
    primary key (id)
)

alter table if exists tool
    add constraint FKq3w26hpijsrjy477m2ceecjgf
    foreign key (client_id)
    references client