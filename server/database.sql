CREATE DATABASE tasklistDB;

CREATE TABLE tasklist(
  task_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);