const CtrlLog = true;

export const error = err => {
  console.log(err);
};

export const CtrlMsg = (handle, method, msg) => {
  if (CtrlLog) {
    console.log("Function: " + handle, "\nMethod: " + method + "\n", msg);
  }
};
