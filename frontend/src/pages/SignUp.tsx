import React from "react";

const SignUp: React.FC = () => {
	return (
		<>
			<div className="carousel carousel-vertical h-screen w-screen">
				<div
					id="box0"
					className="carousel-item h-full w-screen flex justify-center items-center gap-10 flex-col  md:container bg-red-500"
				>
					<p>box 0</p>
					<button className="btn btn-warning">Prev</button>
					<button className="btn btn-primary">Next</button>
				</div>
				<div
					id="box0"
					className="carousel-item h-full w-screen flex justify-center items-center gap-10 flex-col  md:container bg-blue-500"
				>
					<p>box 0</p>
					<button className="btn btn-warning">Prev</button>
					<button className="btn btn-primary">Next</button>
				</div>
				<div
					id="box0"
					className="carousel-item h-full w-screen flex justify-center items-center gap-10 flex-col  md:container bg-red-500"
				>
					<p>box 0</p>
					<button className="btn btn-warning">Prev</button>
					<button className="btn btn-primary">Next</button>
				</div>
			</div>
		</>
	);
};

export default SignUp;
