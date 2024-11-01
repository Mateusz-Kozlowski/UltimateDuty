import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [about, setAbout] = useState(userData.about || "");

	const handleSave = () => {
		setIsEditing(false);
		onSave({ about });
	};

	return (
		<div className="bg-secondary shadow rounded-lg p-6 mb-6 mx-auto text-neutral">
			<h2 className="text-xl font-semibold mb-4 text-white">About</h2>
			{isOwnProfile && (
				<div>
					{isEditing ? (
						<div>
							<textarea
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								className="w-full p-2 bg-secondary text-neutral border border-info rounded focus:outline-none focus:ring-2 focus:ring-primary"
								rows="4"
							/>
							<div className="flex justify-end mt-2">
								<button
									onClick={handleSave}
									className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
								>
									Save
								</button>
							</div>
						</div>
					) : (
						<div>
							<p className="text-info">{userData.about || "No information provided."}</p>
							<button
								onClick={() => setIsEditing(true)}
								className="mt-2 text-primary hover:text-primary-dark transition duration-300"
							>
								Edit
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default AboutSection;
