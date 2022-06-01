insert into test_db.owner (id, name, email, password, business_registration_number,is_removed)
values (1,'허밍버드', 'hummingbird@naver.com', '$2a$10$MHQMWET1x257pWrqqpT/quDw6UH0Vmi8PS9Lzl594cefwODcT8zWa','business_registration_numberbusiness_registration_number',false);
insert into test_db.owner (id, name, email, password, business_registration_number,is_removed)
values (2,'ADMIN', 'admin@tukorea.ac.kr', '$2a$10$Mn6q9QINnSSSzuiWzvlA9OPURaNPlsD1GOpOptDCUUkUZcIxYqwMC','ADMIN',false);

insert into test_db.menu (id, created_date, modified_date, name, owner_id)
values (1, timestamp(NOW()), timestamp(NOW()),'치킨 메뉴판',1);
insert into test_db.category (id, name, menu_id)
values (1,'치킨카테고리',1);
insert into test_db.food (id, content, name, price, category_id)
values (1,'치킨은 역시 황금 올리브유에 튀겨야쥬','치킨',18000,1);
insert into test_db.food (id, content, name, price, category_id)
values (2,'치킨은 역시 양념 치킨','양념 치킨',19000,1);