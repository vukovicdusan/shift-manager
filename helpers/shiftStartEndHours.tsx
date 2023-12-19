export const shiftStartEndHours = (shift: string, modifier: string) => {
  let startWorkHours = "";
  let endWorkHours = "";
  switch (shift) {
    case "day":
      startWorkHours = "T08:00:00";
      endWorkHours = "T20:00:00";
      break;
    case "mid":
      startWorkHours = "T11:00:00";
      endWorkHours = "T23:00:00";
      break;
    case "night":
      startWorkHours = "T20:00:00";
      endWorkHours = "T08:00:00";
      break;
  }
  let returnHours = modifier === "startHours" ? startWorkHours : endWorkHours;

  return returnHours;
};
