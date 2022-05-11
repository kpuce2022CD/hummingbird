SET foreign_key_checks = 0;
drop table if exists test_db.category;
drop table if exists test_db.food;
drop table if exists test_db.menu;
drop table if exists test_db.order_item;
drop table if exists test_db.orders;
drop table if exists test_db.owner;
drop table if exists test_db.hibernate_sequence;
SET foreign_key_checks = 1;


create table test_db.hibernate_sequence
(
    next_val bigint null
);

create table test_db.owner
(
    id bigint auto_increment
        primary key,
    name     varchar(255) not null,
    email    varchar(255) not null,
    password varchar(255) not null,
    business_registration_number varchar(255) not null,
    open_status boolean not null default false
);

create table test_db.menu
(
    id             bigint auto_increment
        primary key,
    created_date   datetime(6) null,
    modified_date  datetime(6) null,
    name           varchar(20) null,
    owner_id bigint      null,
    constraint FK2r2kviwck220ivsufn5584tn0
        foreign key (owner_id) references test_db.owner (id)
);

create table test_db.category
(
    id      bigint auto_increment
        primary key,
    name    varchar(255) null,
    menu_id bigint       null,
    constraint FK7ld4ysop2r15rbwxiue1ko5eb
        foreign key (menu_id) references test_db.menu (id)
);

create table test_db.food
(
    id          bigint auto_increment
        primary key,
    content     varchar(100) null,
    name        varchar(20)  null,
    price       int          null,
    category_id bigint       null,
    constraint FKkomdx99dhk2cveaxugl2lws2u
        foreign key (category_id) references test_db.category (id)
);


create table test_db.orders
(
    order_id     bigint auto_increment
        primary key,
    order_date   datetime(6) not null,
    order_status varchar(30) not null,
    owner_id      bigint      null,
    total_price int not null,
    table_num int not null,
    constraint FKqn03kko0738sehaal2gr2uxl6
        foreign key (owner_id) references test_db.owner (id)
);

create table test_db.order_item
(
    order_item_id bigint auto_increment not null
        primary key,
    food_price   int    not null,
    food_id       bigint null,
    order_id      bigint null,
    status varchar(5) not null default 'doing',
    constraint FK4fcv9bk14o2k04wghr09jmy3b
        foreign key (food_id) references test_db.food (id),
    constraint FKt4dc2r9nbvbujrljv3e23iibt
        foreign key (order_id) references test_db.orders (order_id)
);