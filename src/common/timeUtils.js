export const formatTimestamp = (timestamp) => {
  var currentDate = new Date();
  let date = new Date(timestamp);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  if (
    currentDate.getDate() != day ||
    currentDate.getMonth() + 1 != month ||
    currentDate.getFullYear() != year
  ) {
    var strTime =
      month +
      "." +
      day +
      "." +
      year +
      ". - " +
      hours +
      ":" +
      minutes +
      " " +
      ampm;
  } else var strTime = "Today, " + hours + ":" + minutes + " " + ampm;
  return strTime;
};
