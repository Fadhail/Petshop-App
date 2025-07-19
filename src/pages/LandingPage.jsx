import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import Navbar from "../components/organisms/Navbar";

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const backgroundImages = [
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navbar */}
      <Navbar transparent={true} />

      {/* Background Slider */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-32">
          <div className="text-left max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg font-[Poppins]">
            Adopsi Sahabat Baru
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 drop-shadow-md font-[Poppins]">
              Ribuan hewan menanti rumah penuh cinta. Ayo adopsi dan berikan mereka kehidupan yang lebih baik—mulai hari ini!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button variant="primary" size="large" className="min-w-[150px] text-lg py-4">
                  Adopsi Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
