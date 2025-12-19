import Hero from "@/components/Hero";
import HeroVideo, { type VideoItem } from "@/components/HeroVideo";
import HeroDesign from "@/components/HeroDesign";
import CVPreview from "@/components/CVPreview";

const videos: VideoItem[] = [
  {
    id: 1,
    title: "Cinematic Travel Reel",
    
    youtubeUrl: "https://youtu.be/0S7prdaP__s?si=KR1WvNF_aVdC34L0",
    category: "Personal",
    description:
      "A cinematic travel edit focused on pacing, rhythm, and emotional storytelling.",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
  },
  {
    id: 2,
    title: "TikTok Short Edit",
    youtubeUrl: "https://youtu.be/dCULD3oJkmU?si=PWxCmUVlhAgLc5d2",
    category: "Short",
    description:
      "High-retention vertical short optimized for social platforms.",
    tools: ["Premiere Pro", "CapCut"],
  },
  {
    id: 3,
    title: "Product Commercial",
    youtubeUrl: "https://youtu.be/0S7prdaP__s?si=KR1WvNF_aVdC34L0",
    category: "Commercial",
    description:
      "Clean commercial edit with motion graphics and product highlights.",
    tools: ["After Effects", "Premiere Pro"],
  },
  {
    id: 4,
    title: "Cinematic Travel Reel",

    youtubeUrl: "https://youtu.be/0S7prdaP__s?si=KR1WvNF_aVdC34L0",
    category: "Personal",
    description:
      "A cinematic travel edit focused on pacing, rhythm, and emotional storytelling.",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
  },
  {
    id: 5,
    title: "TikTok Short Edit",
    youtubeUrl: "https://youtu.be/0S7prdaP__s?si=KR1WvNF_aVdC34L0",
    category: "Short",
    description:
      "High-retention vertical short optimized for social platforms.",
    tools: ["Premiere Pro", "CapCut"],
  },
  {
    id: 6,
    title: "Product Commercial",
    youtubeUrl: "https://youtu.be/0S7prdaP__s?si=KR1WvNF_aVdC34L0",
    category: "Commercial",
    description:
      "Clean commercial edit with motion graphics and product highlights.",
    tools: ["After Effects", "Premiere Pro"],
  },
  {
    id: 6,
    title: "Product Commercial",
    youtubeUrl: "https://youtu.be/0S7prdaP__s?si=KR1WvNF_aVdC34L0",
    category: "Commercial",
    description:
      "Clean commercial edit with motion graphics and product highlights.",
    tools: ["After Effects", "Premiere Pro"],
  },
  
];

export default function Home() {
  return (
    <>
      <Hero />
      <HeroVideo videos={videos} />
      <HeroDesign/>
      <CVPreview/>
    </>
  );
}
