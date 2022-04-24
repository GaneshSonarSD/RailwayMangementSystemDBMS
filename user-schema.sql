use management_project;
create table students(id int not null unique, name varchar(20) not null, 
full_name varchar(20) not null, email varchar(20) not null unique,
phone int , comments varchar(60), 
status varchar(10) not null default'Active');	