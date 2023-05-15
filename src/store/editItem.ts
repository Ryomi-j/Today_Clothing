import { atom } from "recoil";

export const selectedDate = atom({
	key: "selectedDate",
	default: 0,
});

export const nextMonday = atom<Date | undefined>({
	key: "nextMonday",
	default: undefined,
});
