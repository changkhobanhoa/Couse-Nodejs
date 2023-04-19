const data = {
  employees: require("../../data/employee.json"),
  setEmployee: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};
const createNewEmloyee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).json({ message: "First and last names are quired" });
  }
  data.setEmployee([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};
const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filterdArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filterdArray, employee];
  data.setEmployee(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};
const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployee([...filteredArray]);
  res.json(data.employees);
};
const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};


module.exports = {
  getAllEmployees,
  createNewEmloyee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
