import React from "react";
import Hero from "../components/home/Hero";
import MapPreview from "../components/home/MapPreview";
import About from "../components/home/About";
import FrequentlyAskedQuestions from "../components/home/FrequentlyAskedQuestions";

const Home: React.FC = () => {
	return (
		<>
			<Hero />
			<MapPreview />
			<About />
			<FrequentlyAskedQuestions />
		</>
	);
};

export default Home;
