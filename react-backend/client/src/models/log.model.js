const CtrlLog = true;
const CSVLog = true;

export const error = err => {
  console.log(err);
};

export const CtrlMsg = (handle, method, msg = "") => {
  if (CtrlLog) {
    console.log("Function: " + handle, "\nMethod: " + method + "\n", msg);
  }
};

export const CSVMsg = (handle, method, msg = "") => {
  if (CSVLog) {
    console.log("Function: " + handle, "\nMethod: " + method + "\n", msg);
  }
};
