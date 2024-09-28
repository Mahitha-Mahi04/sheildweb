import Header from "@/components/Header";
import bgVideo from "../assets/bg-video.mp4";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover"
      >
        <source type="video/mp4" src={bgVideo} />
      </video>
      {/* Header inside the video */}
      <div className="absolute inset-0">
        <Header theme="dark" />
      </div>
      {/* Headline over the video */}
      <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center z-10">
        <h1 className="text-white text-4xl font-bold">
          Shield Your Online Experience
        </h1>
        <p className="text-gray-300 font-semibold">
          Safeguard your data by identifying spam emails and harmful links
          instantly with our advanced scanning technology.
        </p>
        <Link to={"/sign-in"}>
          <Button variant={"outline"}>Get Started</Button>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
