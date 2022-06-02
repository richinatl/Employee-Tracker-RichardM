use employee_trackerDB;

INSERT INTO department
    (name)
VALUES
    ('Accounting'),
    ('Engineering'),
    ('Sales'),
    ('Administration');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Controller', 85450, 1),
    ('Accounting clerk', 42659, 1),
    ('Technician', 62225, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 105118, 3),
    ('Inside Sales', 60725, 3),
    ('Personal Assistant', 48332, 4),
    ('Human Resources', 70000, 4);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ('John', 'Smith', 5),
    ('Amy', 'Pond', 6),
    ('Clara', 'Oswald', 7),
    ('Jack', 'Harkness', 8);