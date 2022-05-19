export const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] => {
	return Object.keys(obj as unknown as object) as (keyof Obj)[];
};

//format date Base on locale
export const formatDate = (date: Date): string => {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	return date.toLocaleString('en-US', { timeZone: timezone });
};
