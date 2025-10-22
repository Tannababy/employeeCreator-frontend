import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modal from "bootstrap/js/dist/modal";
import "./style.scss";
import type { Employee } from "./types/employeeType";

// Selected DOM elements
const formSection = document.getElementById(
  "employeeFormSection"
) as HTMLElement;
const form = document.getElementById("employeeForm") as HTMLFormElement;
const formSubmitBtn = document.getElementById(
  "formSubmit"
) as HTMLButtonElement;
const createEmployeeBtn = document.getElementById(
  "createEmployeeBtn"
) as HTMLButtonElement;
const successModalElement = document.getElementById(
  "successModal"
) as HTMLElement;
const viewAllEmployees = document.getElementById(
  "viewAllEmployees"
) as HTMLAnchorElement;
const employeeTableSection = document.getElementById(
  "employeeTableSection"
) as HTMLElement;
const employeeTable = document.getElementById(
  "employeeTable"
) as HTMLTableElement;

const displayForm = () => {
  formSection.style.display = "block";
};

const displayEmployees = () => {
  employeeTableSection.style.display = "block";
};

const displaySubmitModal = () => {
  const successModal = new Modal(successModalElement);
  successModal.show();
};

const getFormData = (form: HTMLFormElement) => {
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

  formSubmitBtn.disabled = true;

  try {
    const data = getFormData(form);

    const response = await fetch(`http://localhost:8080/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //converts data object to a JSON string
      body: JSON.stringify(data),
    });

    // checks status of request and returns json reponse if ok
    if (!response.ok) {
      throw new Error(`Server at error: ${response.status}`);
    }

    displaySubmitModal();
    form.reset();
  } catch (err) {
    console.error(`Error submitting form: ${err}`);
    formSubmitBtn.disabled = false;
  }
};

const getAllEmployees = async (event: Event) => {
  event.preventDefault();

  const reponse = await fetch("http://localhost:8080/api/employees", {
    method: "GET",
  });

  const employeesList = await reponse.json();
  console.log("Employees found:");

  // Loop through each employee and create a table row
  employeesList.forEach((emp: Employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.firstName}</td>
        <td>${emp.lastName}</td>
        <td>${emp.email}</td>
        <td>${emp.department}</td>
      `;
    employeeTable.appendChild(row);
  });

  displayEmployees();
};

// Event Listeners
createEmployeeBtn.addEventListener("click", displayForm);
form.addEventListener("submit", submitFormData);
viewAllEmployees.addEventListener("click", getAllEmployees);
successModalElement.addEventListener("hidden.bs.modal", () => {
  formSection.style.display = "none";
});
