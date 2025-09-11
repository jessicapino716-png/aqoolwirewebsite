import AuthorProfile from '../AuthorProfile';
import authorImage from '@assets/generated_images/Author_profile_picture_464b5283.png';

const sampleAuthor = {
  id: "author-1",
  name: "Dr. Ahmed Al-Rashid",
  title: "AI Policy Expert & Senior Analyst",
  bio: "Dr. Al-Rashid is a leading expert on artificial intelligence policy and regulation in the Middle East, with over 15 years of experience in technology governance. He has advised government bodies across the GCC on AI strategy and regulatory frameworks.",
  location: "Riyadh, Saudi Arabia",
  expertise: ["AI Policy", "Technology Regulation", "Digital Governance", "GCC Tech Strategy", "Innovation Policy"],
  imageUrl: authorImage,
  social: {
    twitter: "@ahmed_alrashid",
    linkedin: "ahmed-alrashid-phd",
    email: "ahmed@theaqoolai.com"
  }
};

export default function AuthorProfileExample() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Full Author Profile</h3>
        <AuthorProfile author={sampleAuthor} variant="full" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Compact Author Profile</h3>
        <div className="max-w-md">
          <AuthorProfile author={sampleAuthor} variant="compact" />
        </div>
      </div>
    </div>
  );
}