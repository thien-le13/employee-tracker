const db = require("../config");

const Queries = {
  GetDepartmentNames: () => {
    return new Promise((res, rej) =>
      db.query("select name from department", (err, data) => {
        const departmentNames = data.map((department) => department.name);
        res(departmentNames);
      })
    );
  },
  GetRoleNames: () => {
    return new Promise((res, rej) =>
      db.query("select title from role", (err, data) => {
        const roleNames = data.map((role) => role.title);
        res(roleNames);
      })
    );
  },
  GetEmployeeNames: () => {
    return new Promise((res, rej) =>
      db.query(
        "select concat(first_name,' ',last_name) as name from employee",
        (err, data) => {
          const employeeNames = data.map((employee) => employee.name);
          res(employeeNames);
        }
      )
    );
  },
  GetAllDepartments: () => {
    return new Promise((res, rej) =>
      db.query("select * from department", (err, data) => {
        res(data);
      })
    );
  },
  GetAllRoles: () => {
    return new Promise((res, rej) =>
      db.query("select * from role", (err, data) => {
        res(data);
      })
    );
  },
  GetAllEmployees: () => {
    return new Promise((res, rej) =>
      db.query("select * from employee", (err, data) => {
        res(data);
      })
    );
  },
  GetDepartmentIdByName: (name) => {
    return new Promise((res, rej) =>
      db.query(
        "select id from department where name = ?",
        name,
        (err, data) => {
          res(data);
        }
      )
    );
  },
  GetRoleIdByName: (title) => {
    return new Promise((res, rej) =>
      db.query("select id from role where title = ?", title, (err, data) => {
        res(data);
      })
    );
  },
  GetEmployeeIdByName: (first, last) => {
    return new Promise((res, rej) =>
      db.query(
        "select id from employee where first_name = ? and last_name = ?",
        [first, last],
        (err, data) => {
          res(data);
        }
      )
    );
  },
  AddDepartment: (body) => {
    db.query("Insert into department set ?", body, (err) => {
      if (err) console.log(err);
    });
  },
  AddRole: (body) => {
    db.query("Insert into role set ?", body, (err) => {
      if (err) console.log(err);
    });
  },
  AddEmployee: (body) => {
    db.query("Insert into employee set ?", body);
  },
  UpdateEmployeeRole: (body, employeeId) => {
    db.query("Update employee set ? where ?", [body, { id: employeeId }]);
  },
};

module.exports = Queries;
