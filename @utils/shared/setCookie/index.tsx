export const setCookie = ({
  res,
  name,
  value,
  days,
}: {
  res?: any;
  name: string;
  value: string;
  days: number;
}) => {
  if (typeof document === "undefined") {
    res.setHeader(
      "Set-Cookie",
      `${name}=${encodeURIComponent(value || "")}; Max-Age=${
        days * 24 * 60 * 60
      }; Path=/`
    );
  } else {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie =
      name + "=" + encodeURIComponent(value || "") + expires + "; path=/";
  }
};
