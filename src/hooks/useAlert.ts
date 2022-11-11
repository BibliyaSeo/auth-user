import Swal from "sweetalert2";

export const successAlert = (text: string, navi: any) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: text,
  }).then(function (result) {
    if (result.value) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      navi;
    }
  });
};

export const errorAlert = (text: string, navi: any) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: text,
  }).then(function (result) {
    if (result.value) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      navi;
    }
  });
};

export const infoAlert = (text: string, title?: string) => {
  Swal.fire({
    icon: "info",
    title: title ? title : "Info",
    text: text,
  });
};
