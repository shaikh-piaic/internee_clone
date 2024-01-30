import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { IoLocationOutline } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, selectAllCourses } from "../../redux/courseSlice";

const RecentInternships = () => {
	const dispatch = useDispatch();
	const courses = useSelector(selectAllCourses);

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);
	console.log(courses);
	return (
		<>
			<div className='flex flex-wrap justify-between my-10'>
				{courses?.map((items) => (
					<div
						className='w-full sm:w-1/2 md:w-1/2 lg:w-1/3 px-3 py-5 hover:shadow-2xl'
						key={items.title}>
						<Card className='all-card'>
							<CardMedia
								component='img'
								height='194'
								image={items.image}
								alt='Image'
							/>
							<CardContent>
								<Typography variant='h6' fontWeight='bold'>
									{items.title}
								</Typography>
								<div className='flex items-center '>
									<IoLocationOutline className='text-green-500' />{" "}
									<p className='mr-5 ml-1 text-gray-400'>Remote</p>
									<BiTime className='text-green-500' />{" "}
									<p className='ml-1 text-gray-400'>{items.duration} Month</p>
								</div>
							</CardContent>{" "}
							<hr />
							<div className='flex justify-end py-5 px-5'>
								<a href={items.link} target='_blank' rel='noopener noreferrer'>
									<Button
										variant='contained'
										style={{ borderRadius: "30px", padding: "10px 12px" }}>
										Apply Now
									</Button>
								</a>
							</div>
						</Card>
					</div>
				))}
			</div>
			<div className='flex lg:justify-end md:justify-end justify-start lg:pb-10 md:pb-10 pb-5'>
				<Button
					variant='contained'
					style={{
						borderRadius: "30px",
						padding: "20px 40px",
						textTransform: "capitalize",
						fontSize: "20px",
					}}>
					Browser Internships
				</Button>
			</div>
		</>
	);
};

export default RecentInternships;
