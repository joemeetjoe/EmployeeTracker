-- view all employees
SELECT  employees.id, 
        employees.first_name, 
        employees.last_name, 
        roles.title, 
        departments.title AS department, 
        roles.salary, 
        employees_copy.first_name AS manager 
FROM    (((employees
INNER JOIN roles ON employees.role_id = roles.id) 
INNER JOIN departments ON roles.department_id = departments.id)
LEFT JOIN employees as employees_copy ON employees.manager_id = employees_copy.id) 
ORDER BY id;


-- view all roles
SELECT  roles.id,
        roles.title,
        departments.title as departments,
        roles.salary
FROM (roles
INNER JOIN departments ON department_id = departments.id)
ORDER BY id;

-- view all departments
SELECT * FROM departments ORDER BY id;

-- add department


