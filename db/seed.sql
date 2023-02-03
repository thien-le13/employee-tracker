DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
use employees_db;
create table department (
	id int primary key auto_increment not null,
    name varchar(30) not null
);
create table role (
	id int primary key auto_increment not null,
    title varchar(30) not null,
    salary decimal not null,
    department_id int not null,
    foreign key (department_id) references department(id)
    on delete cascade
);
create table employee (
	id int primary key auto_increment not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int null,
    Foreign key (role_id) references role(id),
    Foreign key (manager_id) references employee(id)
);


use employees_db;
Insert into department (name)
VALUES
('Development'),
('Art');
Insert into role (title, salary, department_id)
VALUES
('Manager',50,1),('Developer',25,1),
('Lead Artist',50,2),('Animator',25,2);
Insert into employee (first_name, last_name, role_id, manager_id)
VALUES 
('John','Doe',1,null),('Joe','Mo',2,1);