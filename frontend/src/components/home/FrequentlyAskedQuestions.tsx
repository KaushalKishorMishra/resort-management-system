import React from "react";

const FrequentlyAskedQuestions = () => {
	return (
		<>
			<div className="faq bg-custom-bg-light py-10">
				<div className="container text-black">
					<p className="text-custom-accent uppercase font-bold font-ostwald text-lg">
						FREQUENTLY ASKED QUESTIONS
					</p>
					<div className="collapse collapse-arrow rounded-none border-0 border-b border-b-black rounded-none border-0 border-b border-b-black">
						<input type="radio" name="my-accordion-2" defaultChecked />
						<div className="collapse-title text-xl font-medium">
							How do I navigate the map to find accommodations?
						</div>
						<div className="collapse-content">
							<p>
								To navigate the map, simply use your mouse or touchpad to drag and zoom in/out. You can
								also use the search bar to enter specific locations or landmarks.
							</p>
						</div>
					</div>
					<div className="collapse collapse-arrow rounded-none border-0 border-b border-b-black">
						<input type="radio" name="my-accordion-2" />
						<div className="collapse-title text-xl font-medium">
							Can I see room details and availability directly on the map?
						</div>
						<div className="collapse-content">
							<p>
								Yes, each room is represented by a marker on the map. Clicking on a marker will display
								details such as room type, amenities, pricing, and availability.
							</p>
						</div>
					</div>
					<div className="collapse collapse-arrow rounded-none border-0 border-b border-b-black">
						<input type="radio" name="my-accordion-2" />
						<div className="collapse-title text-xl font-medium">How do I book a room using the map?</div>
						<div className="collapse-content">
							<p>
								Once you've found a room you're interested in, click on the marker to view its details.
								From there, you can proceed to the booking page to select your dates, number of guests,
								and complete the reservation process.
							</p>
						</div>
					</div>
					<div className="collapse collapse-arrow rounded-none border-0 border-b border-b-black">
						<input type="radio" name="my-accordion-2" />
						<div className="collapse-title text-xl font-medium">
							Are the prices shown on the map accurate?
						</div>
						<div className="collapse-content">
							<p>
								Yes, the prices displayed on the map are updated in real-time and reflect the current
								rates for each room.
							</p>
						</div>
					</div>
					<div className="collapse collapse-arrow rounded-none border-0 border-b border-b-black">
						<input type="radio" name="my-accordion-2" />
						<div className="collapse-title text-xl font-medium">
							Can I filter my search results on the map?
						</div>
						<div className="collapse-content">
							<p>
								Yes, you can use filters such as price range, room type, and amenities to refine your
								search results directly on the map.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FrequentlyAskedQuestions;
