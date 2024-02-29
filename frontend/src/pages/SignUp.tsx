import React from "react";

const SignUp: React.FC = () => {
	return (
		<>
			<div className="carousel carousel-vertical h-screen w-screen">
				<div
					id="item1"
					className="carousel-item h-full w-screen flex justify-center items-center gap-10 flex-col  md:container bg-red-500"
				>
					<p>item 1</p>
					<div className="flex items-center gap-10">
						<a className="btn btn-disabled">Prev</a>
						<a href="#item2" className="btn btn-primary">
							Next
						</a>
					</div>
				</div>
				<div
					id="item2"
					className="carousel-item h-full w-screen flex justify-center items-center gap-10 flex-col  md:container bg-yellow-500"
				>
					<p>item 2</p>
					<div className="flex items-center gap-10">
						<a href="#item1" className="btn btn-primary">
							Prev
						</a>
						<a href="#item3" className="btn btn-primary">
							Next
						</a>
					</div>
				</div>
				<div
					id="item3"
					className="carousel-item h-full w-screen flex justify-center items-center gap-10 flex-col  md:container bg-blue-500"
				>
					<p>item 3</p>
					<div className="flex items-center gap-10">
						<a href="#item2" className="btn btn-primary">
							Prev
						</a>
						<a className="btn btn-primary">
							Submit
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
