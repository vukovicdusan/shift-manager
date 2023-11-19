import { formatDate } from "fullcalendar";

export const formatMyDate = (date: string, noSlash?: string) => {
	const formatedDate = formatDate(date, {
		month: "2-digit",
		year: "numeric",
		day: "2-digit",
		timeZone: "local",
		locale: "es",
	});

	if (!noSlash) {
		return formatedDate;
	} else {
		return formatedDate.split("/").join("-");
	}
};
