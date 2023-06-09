import { atom } from "recoil";

export const selectedDate = atom({
	key: "selectedDate",
	default: 0,
});

export const nextMondayState = atom<Date | undefined>({
	key: "nextMonday",
	default: undefined,
});

export const weekDatesState = atom({
	key: "weekDatesState",
	default: [] as Date[],
  });