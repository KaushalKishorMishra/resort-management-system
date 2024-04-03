import React from "react";
import { BsCashStack } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GrBug } from "react-icons/gr";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoIosMail } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";

const Contact:React.FC = () => {
	return (
		<>
			<div className="container my-24 mx-auto md:px-6">
				<section className="mb-32">
					<div className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat bg-[url('https://mdbcdn.b-cdn.net/img/new/textures/full/284.jpg')]"></div>
					<div className="container px-6 md:px-12">
						<div className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px]">
							<div className="flex flex-wrap">
								<div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
									<form className="form-control gap-4">
										{/* name */}
										<label className="input input-bordered flex items-center gap-2">
											<FaUser size={20} />
											<input type="text" className="grow" placeholder="Name" />
										</label>
										<label className="input input-bordered flex items-center gap-2">
											<IoIosMail size={20} />
											<input type="text" className="grow" placeholder="Email" />
										</label>
										<textarea className="textarea" placeholder="Message"></textarea>
										<button className="btn btn-custom-accent">Send Message</button>
									</form>
								</div>
								<div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
									<div className="flex flex-wrap">
										<div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
											<div className="flex items-start">
												<div className="shrink-0">
													<div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
														<HiOutlineComputerDesktop className="text-custom-accent text-3xl" />
													</div>
												</div>
												<div className="ml-6 grow">
													<p className="mb-2 font-bold dark:text-white">Technical support</p>
													<p className="text-neutral-500 dark:text-neutral-200">
														support@example.com
													</p>
													<p className="text-neutral-500 dark:text-neutral-200">
														+1 234-567-89
													</p>
												</div>
											</div>
										</div>
										<div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
											<div className="flex items-start">
												<div className="shrink-0">
													<div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
														<BsCashStack className="text-custom-accent text-3xl" />
													</div>
												</div>
												<div className="ml-6 grow">
													<p className="mb-2 font-bold dark:text-white">Sales questions</p>
													<p className="text-neutral-500 dark:text-neutral-200">
														sales@example.com
													</p>
													<p className="text-neutral-500 dark:text-neutral-200">
														+1 234-567-89
													</p>
												</div>
											</div>
										</div>
										<div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:mb-12 lg:w-full lg:px-6 xl:w-6/12">
											<div className="align-start flex">
												<div className="shrink-0">
													<div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
														<IoNewspaperOutline className="text-custom-accent text-3xl" />
													</div>
												</div>
												<div className="ml-6 grow">
													<p className="mb-2 font-bold dark:text-white">Press</p>
													<p className="text-neutral-500 dark:text-neutral-200">
														press@example.com
													</p>
													<p className="text-neutral-500 dark:text-neutral-200">
														+1 234-567-89
													</p>
												</div>
											</div>
										</div>
										<div className="w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:mb-12 xl:w-6/12">
											<div className="align-start flex">
												<div className="shrink-0">
													<div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
														<GrBug className="text-custom-accent text-3xl" />
													</div>
												</div>
												<div className="ml-6 grow">
													<p className="mb-2 font-bold dark:text-white">Bug report</p>
													<p className="text-neutral-500 dark:text-neutral-200">
														bugs@example.com
													</p>
													<p className="text-neutral-500 dark:text-neutral-200">
														+1 234-567-89
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Contact;
