import React from "react";

const FrequentlyAskedQuestions = () => {
	return (
		<>
			<div className="faq bg-custom-bg-light py-10">
				<div className="container text-black">
					<p className="text-custom-accent uppercase font-bold font-ostwald text-lg">FREQUENTLY ASKED QUESTIONS</p>
					<div className="collapse collapse-arrow">
						<input type="radio" name="my-accordion-2" defaultChecked />
						<div className="collapse-title text-xl font-medium border border-top- border-b-black">
							Click to open this one and close others
						</div>
						<div className="collapse-content">
							<p>hello</p>
						</div>
					</div>
					<div className="collapse collapse-arrow">
						<input type="radio" name="my-accordion-2" />
						<div className="collapse-title text-xl font-medium">
							Click to open this one and close others
						</div>
						<div className="collapse-content">
							<p>hello</p>
						</div>
					</div>
					<div className="collapse collapse-arrow">
						<input type="radio" name="my-accordion-2" />
						<div className="collapse-title text-xl font-medium">
							Click to open this one and close others
						</div>
						<div className="collapse-content">
							<p>hello</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FrequentlyAskedQuestions;
