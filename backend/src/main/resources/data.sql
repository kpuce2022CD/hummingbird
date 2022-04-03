insert into test_db.owner (id, name, email)
values (1,'허밍버드', 'hummingbird@naver.com');
insert into test_db.menu (id, created_date, modified_date, name, owner_id)
values (1, timestamp(NOW()), timestamp(NOW()),'치킨 메뉴판',1);
insert into test_db.category (id, name, menu_id)
values (1,'치킨카테고리',1);
insert into test_db.food (id, content, name, price, category_id)
values (1,'치킨은 역시 황금 올리브유에 튀겨야쥬','치킨',18000,1);
insert into test_db.food (id, content, name, price, category_id)
values (2,'치킨은 역시 양념 치킨','양념 치킨',19000,1);
insert into test_db.shop (shop_id, email, open_status)
values (1,'hummingbird@naver.com','OPEN');
insert into test_db.customer (id, email, name, password, token)
values (1,'hummingbird@gmail.com','손님1','$2a$10$MHQMWET1x257pWrqqpT/quDw6UH0Vmi8PS9Lzl594cefwODcT8zWa','손님token');