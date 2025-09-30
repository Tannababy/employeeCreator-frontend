import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./style.scss";
import type { EmployeeData } from "./employeeType";

const form = document.getElementById("employeeFormSection") as HTMLFormElement;
const createEmployeeBtn = document.getElementById(
  "createEmployeeBtn"
) as HTMLButtonElement;

const displayForm = () => {
  form.style.display = "block";
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


createEmployeeBtn.addEventListener("click", displayForm);

