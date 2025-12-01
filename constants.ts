import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  name: "Muddasir Ali",
  title: "Web Developer (HTML, JavaScript, Tailwind CSS)",
  location: "Karachi, Pakistan",
  email: "your-email@example.com",
  phone: "+92 300 1234567",
  instagram: "FitFamVibes",
  github: "github.com/sangi1235",
  profileSummary: "A passionate Web Developer specializing in HTML, JavaScript, and Tailwind CSS. I build clean, responsive, modern websites with a focus on UI/UX, speed, and mobile optimization.",
  skills: [
    {
      title: "Technical",
      skills: ["HTML5", "CSS3/Tailwind", "JavaScript", "Responsive Design", "UI/UX", "Website Optimization", "Basic Git/GitHub"]
    },
    {
      title: "Soft Skills",
      skills: ["Communication", "Teamwork", "Problem Solving", "Time Management"]
    }
  ],
  education: [
    {
      degree: "Intermediate",
      location: "Karachi, Pakistan",
      status: "Ongoing"
    }
  ],
  projects: [
    {
      title: "Nexus IoT Dashboard",
      description: "A high-performance, real-time IoT dashboard built with React. Features dynamic data visualization for monitoring device connectivity, responsive charts, and a modern, dark-themed UI for seamless system management.",
      tags: ["React", "Dashboard", "IoT", "Tailwind"],
      liveLink: "https://nexus-iot-dashboard.vercel.app/",
      repoLink: "https://github.com/sangi1235/Nexus-IoT-Dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "E-Commerce Website",
      description: "A fully responsive e-commerce platform featuring a dynamic product catalog, interactive shopping cart with state management, and a streamlined checkout interface. Optimized for speed and mobile usability using Tailwind CSS.",
      tags: ["HTML", "Tailwind CSS", "JavaScript"],
      liveLink: "https://yt-cam-67yf.vercel.app/",
      repoLink: "https://github.com/sangi1235/yt-cam-67yf-",
      image: "https://image.thum.io/get/width/1200/crop/630/https://yt-cam-67yf.vercel.app/"
    },
    {
      title: "Restaurant Website (Gourmet Finds)",
      description: "An elegant, mobile-responsive restaurant portfolio designed to showcase culinary offerings. Features smooth scroll animations, an appetizing visual layout for the menu, and an intuitive contact section to enhance user engagement.",
      tags: ["UI/UX", "Animation", "Responsive"],
      liveLink: "https://gourmet-finds.vercel.app/",
      repoLink: "https://github.com/sangi1235/GourmetFinds",
      image: "https://image.thum.io/get/width/1200/crop/630/https://gourmet-finds.vercel.app/"
    },
    {
      title: "Payment Test Page (Fake Checkout)",
      description: "A robust frontend payment simulation designed to test UI interactions. Includes real-time form validation, input formatting for credit cards, and responsive error handling to demonstrate secure and user-friendly checkout flows.",
      tags: ["Forms", "Validation", "Frontend"],
      liveLink: "https://pay-flow-ai-checkout.vercel.app/",
      repoLink: "https://github.com/sangi1235/PayFlow-AI-Checkout",
      image: "https://image.thum.io/get/width/1200/crop/630/https://pay-flow-ai-checkout.vercel.app/"
    },
    {
      title: "FitFamVibes Fitness Website",
      description: "A dynamic fitness and lifestyle platform designed to inspire healthy living. Features tailored workout routines, nutritional advice, and an energetic, responsive UI built for community engagement and mobile accessibility.",
      tags: ["React", "Tailwind CSS", "Fitness"],
      liveLink: "https://fit-fam-vibes-by-mh2-0.vercel.app/",
      repoLink: "https://github.com/sangi1235/FitFamVibes",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200"
    }
  ],
  experience: [
    {
      role: "Freelance Web Developer",
      duration: "2023 – Present",
      details: [
        "Designed websites for clients using HTML, JS, Tailwind CSS",
        "Improved UI/UX and optimized speed",
        "Built reusable web components"
      ]
    }
  ],
  certifications: ["Microsoft Office", "PMP Basic Knowledge"],
  languages: ["English", "Urdu"],
  careerObjective: "To work in a professional environment where I can apply my web development skills and grow into a full-stack developer."
};