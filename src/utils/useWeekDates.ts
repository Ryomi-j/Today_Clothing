import { useRecoilState } from "recoil";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { DateTime } from "luxon";
import { nextMondayState, weekDatesState } from "../store/date";
import { useEffect } from "react";
import { db } from "../firebase";

export const useWeekDates = () => {
	const [weekDates, setWeekDates] = useRecoilState(weekDatesState);
	const [nextMonday, setNextMonday] = useRecoilState(nextMondayState);

	useEffect(() => {
		const getWeekDates = async () => {
			const savedMonday = (await getDoc(doc(db, "next_Monday", "Monday"))).data();
			const today = new Date().getTime();
			if (today >= savedMonday?.Monday) {
				const updatedNextMonday = savedMonday?.Monday
					? DateTime.fromMillis(savedMonday.Monday).plus({ weeks: 1 }).toJSDate()
					: DateTime.local().startOf("week").plus({ weeks: 1 }).toJSDate();
				setNextMonday(updatedNextMonday);
				setDoc(doc(db, "next_Monday", "Monday"), {
					Monday: updatedNextMonday.getTime(),
				});
			}
			if (savedMonday) {
				const weekDate = []
				const next = nextMonday ?? savedMonday.Monday;
				for (let i = 0; i < 7; i++) {
					const date = new Date(next);
					date.setDate(date.getDate() + i);
					weekDate.push(date);
				}
				setWeekDates(weekDate);
			}
		};
		getWeekDates();
	}, [nextMonday, setNextMonday, setWeekDates]);

	return weekDates || [];
};