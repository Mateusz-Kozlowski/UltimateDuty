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
		setShowFront((prev) => true);
	};

	const reverse = () => {
		setShowFront((prev) => !prev);
	};	

	const handlePrev = () => {
		setCurrentCardIdx((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
		setShowFront((prev) => true);
	};

	const currentCard = flashcards[currentCardIdx];

	return (
		<div className="flex flex-col items-center justify-start min-h-screen bg-base-900 text-info px-4 py-12">
			<div className="w-full max-w-md">
				{/* Flashcard */}
				<div className="bg-neutral-800 text-white rounded-2xl shadow-lg p-8 text-center mb-10">
					<h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
						{showFront ? currentCard.name : currentCard.description}
					</h2>
				</div>

				{/* Navigation buttons */}
				<div className="flex justify-center gap-4">
					<button onClick={handlePrev} className="btn btn-outline btn-info w-28">
						Previous
					</button>
					<button onClick={reverse} className="btn w-28 bg-gray-200 text-black hover:bg-gray-400 hover:text-black transition-colors duration-200">
						Reverse
					</button>
					<button onClick={handleNext} className="btn btn-primary w-28">
						Next
					</button>
				</div>
			</div>
		</div>
	);		
};
export default FlashcardsPage;
