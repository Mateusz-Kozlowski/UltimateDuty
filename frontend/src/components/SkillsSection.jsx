import { X } from "lucide-react";
import { useState } from "react";

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [skills, setSkills] = useState(userData.skills || []);
	const [newSkill, setNewSkill] = useState("");

	const handleAddSkill = () => {
		if (newSkill && !skills.includes(newSkill)) {
			setSkills([...skills, newSkill]);
			setNewSkill("");
		}
	};

	const handleDeleteSkill = (skill) => {
		setSkills(skills.filter((s) => s !== skill));
	};

	const handleSave = () => {
		onSave({ skills });
		setIsEditing(false);
	};

	return (
		<div className='bg-secondary text-neutral-content shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl text-white font-semibold mb-4'>Skills</h2>
			<div className='flex flex-wrap text-info'>
				{skills.map((skill, index) => (
					<span
						key={index}
						className='bg-base-100 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center'
					>
						{skill}
						{isEditing && (
							<button onClick={() => handleDeleteSkill(skill)} className='ml-2 text-error'>
								<X size={14} />
							</button>
						)}
					</span>
				))}
			</div>

			{isEditing && (
				<div className='mt-4 flex'>
					<input
						type='text'
						placeholder='New Skill'
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						className='flex-grow p-2 bg-base-100 text-white rounded-l focus:outline-none'
					/>
					<button
						onClick={handleAddSkill}
						className='bg-primary text-white py-2 px-4 rounded-r hover:bg-primary-dark transition duration-300'
					>
						Add Skill
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button
							onClick={handleSave}
							className='mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className='mt-4 text-primary hover:text-primary-dark transition duration-300'
						>
							Edit Skills
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default SkillsSection;
