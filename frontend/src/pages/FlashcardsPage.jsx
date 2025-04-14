import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";

const FlashcardsPage = () => {
	const [currentCardIdx, setCurrentCardIdx] = useState(0);
	const [showFront, setShowFront] = useState(true);

	const { category } = useParams();

	const { data: flashcards, isLoading } = useQuery({
		queryKey: [category],
		queryFn: async () => {
			const res = await axiosInstance.get("/flashcards/:" + category);
			return res.data;
		},
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader className="animate-spin" size={32} />
			</div>
		);
	}

	console.log(flashcards);

	const handleNext = () => {
		setCurrentCardIdx((prevIndex) => (prevIndex + 1) % flashcards.length);
	};

	const reverse = () => {
		setShowFront((prev) => !prev);
	};	

	const handlePrev = () => {
		setCurrentCardIdx((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
	};

	const currentCard = flashcards[currentCardIdx];

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-info p-6">
			<div className="bg-secondary text-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
				<div className="bg-secondary text-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
    				{showFront ? (
        				<h2 className="text-2xl font-bold mb-2">{currentCard.name}</h2>
    				) : (
        				<p className="text-md">{currentCard.description}</p>
    				)}
				</div>
			</div>

			<div className="flex mt-6 gap-4">
				<button onClick={handlePrev} className="btn btn-outline btn-info">
					Previous
				</button>
				<button onClick={reverse} className="btn btn-primary">
					Reverse
				</button>
				<button onClick={handleNext} className="btn btn-primary">
					Next
				</button>
			</div>
		</div>
	);
};
export default FlashcardsPage;
