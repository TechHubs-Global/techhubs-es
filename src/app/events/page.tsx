import { LumaEvents } from "./_components/luma-events";

// Mock data
const events = [
  {
    id: "1",
    title: "LW15 - Madrid, España - Supabase Meetup",
    description:
      "Ven a pasar el rato, conocer gente increíble y charlar sobre todo lo relacionado con la tecnología y la innovación.",
    date: "31 July 2025, 18:00",
    location: "Madrid, Spain",
    attendees: 23,
    host: "Nicolas Gonzalez",
    imageUrl:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/gallery-images/v0/44926835-405e-4870-a748-6c56f9f833cc",
    lumaUrl: "https://lu.ma/hawtfz5f",
    tags: ["Supabase", "Meetup"],
  },
];

export default function EventsPage() {
  return (
    <div className="w-full">
      <LumaEvents
        title={
          <>
            Connect with the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
              Spain Community
            </span>
          </>
        }
        description="Discover events, meetups and tech conferences across Spain. Connect with professionals, learn new technologies and become part of the most active tech community in the country."
        primaryImageSrc="/assets/events/primary.webp"
        secondaryImageSrc="/assets/events/secondary.webp"
        events={events}
        reverseLayout={false}
      />
    </div>
  );
}
