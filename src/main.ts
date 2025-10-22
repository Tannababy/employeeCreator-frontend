import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./style.scss";
import type { EmployeeData } from "./employeeType";

const formSection = document.getElementById(
  "employeeFormSection"
) as HTMLElement;
const form = document.getElementById("employeeForm") as HTMLFormElement;
const createEmployeeBtn = document.getElementById(
  "createEmployeeBtn"
) as HTMLButtonElement;
const viewAllEmployees = document.getElementById(
  "viewAllEmployees"
) as HTMLAnchorElement;
const employeeTable = document.getElementById(
  "employeeTableSection"
) as HTMLElement;


const displayForm = () => {
  formSection.style.display = "block";
};

const displayEmployees = () => {
    console.log("Displaying employee table");
    employeeTable.style.display = "block";
};

const getFormData = (form: HTMLFormElement): EmployeeData => {
  const formInfo = new FormData(form);

  return {
    firstName: formInfo.get("employeeFirstName") as string,
    lastName: formInfo.get("employeeLastName") as string,
    email: formInfo.get("employeeEmail") as string,
    mobile: formInfo.get("employeeMobile") as string,
    address: formInfo.get("employeeAddress") as string,
    department: formInfo.get("employeeDept") as string,
    startDate: formInfo.get("startDate") as string,
    contractType: formInfo.get("contractType") as any,
  };
};

const submitFormData = async (event: Event) => {
  event.preventDefault();

  try {
    const data = getFormData(form);

    const response = await fetch(`http://localhost:8080/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //POST request - the body must be a JSON string not an object in fetch
      body: JSON.stringify(data),
    });

    // checks status of request and return json reponse if ok
    if (!response.ok) {
      throw new Error(`Server at error: ${response.status}`);
    }
    const result = await response.json();
    console.log("Employee created:", result);

    return result;
  } catch (err) {
    console.error(`Error submitting form: ${err}`);
    return {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
      department: "Error",
      startDate: "",
      contractType: "",
    };
  }
};

const getAllEmployees = async (event: Event) => {
  event.preventDefault();

  const reponse = await fetch("http://localhost:8080/api/employees", {
    method: "GET",
  });

  const result = await reponse.json();
  console.log("Employees found:", result);

  return result;
};

createEmployeeBtn.addEventListener("click", displayForm);
form.addEventListener("submit", submitFormData);
viewAllEmployees.addEventListener("click", displayEmployees);
