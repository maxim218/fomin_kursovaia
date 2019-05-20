DROP TABLE IF EXISTS memberboy;
DROP TABLE IF EXISTS paper;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS house;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS tip;

CREATE TABLE country (
    country_id SERIAL PRIMARY KEY,
    country_name TEXT
);

CREATE TABLE city (
    city_id SERIAL PRIMARY KEY,
    city_name TEXT,
    city_country_id INTEGER REFERENCES country(country_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE house (
    house_id SERIAL PRIMARY KEY,
    house_name TEXT,
    house_city_id INTEGER REFERENCES city(city_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE department (
    department_id SERIAL PRIMARY KEY,
    department_name TEXT,
    department_house_id INTEGER REFERENCES house(house_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE people (
    people_id SERIAL PRIMARY KEY,
    people_fio TEXT,
    people_department_id INTEGER REFERENCES department(department_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE tip (
    tip_id SERIAL PRIMARY KEY,
    tip_name TEXT
);

CREATE TABLE paper (
    paper_id SERIAL PRIMARY KEY,
    paper_people_id INTEGER REFERENCES people(people_id) ON DELETE CASCADE NOT NULL,
    paper_tip_id INTEGER REFERENCES tip(tip_id) ON DELETE CASCADE NOT NULL,
    paper_content TEXT
);

CREATE TABLE memberboy (
    memberboy_id SERIAL PRIMARY KEY,
    memberboy_paper_id INTEGER REFERENCES paper(paper_id) ON DELETE CASCADE NOT NULL,
    memberboy_people_id INTEGER REFERENCES people(people_id) ON DELETE CASCADE NOT NULL,
    memberboy_finish TEXT DEFAULT 'NO'
);

