create table users (
	id serial primary key,
	name varchar,
	birth_date date,
	email varchar,
	password varchar,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp,
	active boolean default true,
	type varchar
)

create table session (
	id serial primary key,
	user_id integer references users(id),
	active boolean default true,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp,
	token varchar
)

create table vacancy (
	id serial primary key,
	title varchar,
	seniority varchar,
	country varchar,
	state varchar,
	city varchar,
	description varchar (2048),
	company_name varchar,
	type varchar,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp,
	active boolean default true
)

create table profile (
	id serial primary key,
	user_id integer references users(id),
	title varchar,
	about varchar(1024),
	description varchar (2048),
	experiences json,
	courses json,
	skills json,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp
)
