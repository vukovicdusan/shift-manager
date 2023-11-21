export const getMonth = (date: string) => {
	let month = date.split("-")[1];
	let monthName = "";
	switch (month) {
		case "01":
			monthName = "january";
			break;
		case "02":
			monthName = "february";
			break;
		case "003":
			monthName = "march";
			break;
		case "04":
			monthName = "april";
			break;
		case "05":
			monthName = "may";
			break;
		case "06":
			monthName = "june";
			break;
		case "07":
			monthName = "july";
			break;
		case "08":
			monthName = "august";
			break;
		case "09":
			monthName = "september";
			break;
		case "10":
			monthName = "october";
			break;
		case "11":
			monthName = "november";
			break;
		case "12":
			monthName = "december";
			break;
	}
	return monthName;
};
