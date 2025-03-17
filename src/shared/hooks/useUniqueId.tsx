const useUniqueId = () => {
	const generateId = () => {
		const random = Math.random().toString(33).substring(2);
		const date = Date.now().toString(33);

		return random + date;
	};

	return {
		generateId,
	};
};

export default useUniqueId;
