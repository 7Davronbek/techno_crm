create table history
(
    client_id  integer,
    id         serial not null,
    user_id    integer,
    updated_at timestamp(6),
    primary key (id),
    foreign key (user_id) references "user",
    foreign key (client_id) references client
)
