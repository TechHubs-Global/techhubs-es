import { LumaEvents } from "./_components";

// Mock data
const events = [
  {
    id: "1",
    title: "LW15 - Madrid, España - Supabase Meetup",
    description:
      "Launchweek 15 of Supabase. A meetup for Supabase users and developers to connect and share knowledge.",
    date: "31 July 2025, 18:00",
    location: "Madrid, Spain",
    attendees: 23,
    host: "Nicolas Gonzalez",
    imageUrl:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/gallery-images/v0/44926835-405e-4870-a748-6c56f9f833cc",
    lumaUrl: "https://lu.ma/hawtfz5f",
    tags: ["Supabase", "Meetup"],
  },
  {
    id: "2",
    title: "React Barcelona Conference 2025",
    description:
      "The most important React conference in Spain. International speakers and networking with the local community.",
    date: "22 March 2025, 09:00",
    location: "Barcelona, Spain",
    attendees: 485,
    host: "React Barcelona",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    lumaUrl: "https://lu.ma/react-barcelona-2025",
    tags: ["React", "Conference"],
  },
  {
    id: "3",
    title: "Python Valencia - Machine Learning Workshop",
    description:
      "Practical workshop on Machine Learning with Python. Learn to implement ML models from scratch.",
    date: "28 March 2025, 16:00",
    location: "Valencia, Spain",
    attendees: 89,
    host: "Python Valencia",
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    lumaUrl: "https://lu.ma/python-valencia-ml",
    tags: ["Python", "Machine Learning"],
  },
  {
    id: "4",
    title: "DevOps Sevilla - Kubernetes & Cloud Native",
    description:
      "Event dedicated to Kubernetes and cloud native technologies. Real-world use cases and best practices.",
    date: "5 April 2025, 18:30",
    location: "Sevilla, Spain",
    attendees: 156,
    host: "DevOps Sevilla",
    imageUrl:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    lumaUrl: "https://lu.ma/devops-sevilla-k8s",
    tags: ["DevOps", "Kubernetes"],
  },
  {
    id: "5",
    title: "UX/UI Design Bilbao - Design Systems & Figma",
    description:
      "Session focused on design systems and collaborative design tools. Perfect for designers and developers.",
    date: "12 April 2025, 17:00",
    location: "Bilbao, Spain",
    attendees: 73,
    host: "UX Bilbao",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    lumaUrl: "https://lu.ma/ux-bilbao-design",
    tags: ["UX/UI", "Design Systems"],
  },
  {
    id: "6",
    title: "Blockchain & Web3 Madrid",
    description:
      "Exploring the future of decentralized web. Use cases, NFTs, DeFi and opportunities in the Web3 ecosystem.",
    date: "20 April 2025, 19:30",
    location: "Madrid, Spain",
    attendees: 234,
    host: "Web3 Madrid",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    lumaUrl: "https://lu.ma/web3-madrid-blockchain",
    tags: ["Blockchain", "Web3"],
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
        primaryImageSrc="https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        secondaryImageSrc="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        events={events}
        reverseLayout={false}
      />
    </div>
  );
}
