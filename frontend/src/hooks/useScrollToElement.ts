export function useScrollToElement(elementId: string) {
	return function () {
		const element = document.getElementById(elementId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};
}
