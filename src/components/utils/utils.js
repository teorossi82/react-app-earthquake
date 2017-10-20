export const truncate = (s, num, elp) => {
	if (s.length > num) {
        let sub = s.substring(0, num);
        sub += elp ? '...' : '';
        return sub;
    }
    return s;
};
