import { useNavigate } from 'react-router-dom';


function Hero() {
  const navigate = useNavigate();

  const GetStarted = () => {       
    navigate("/jobs");                       
  };


  return (
    <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-yellow-600 rounded-xl mx-4 mt-6 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 min-h-[500px] px-4 py-16 text-center">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
          Connect Talent with Opportunity
        </h1>
        <p className="text-white text-lg md:text-xl max-w-2xl leading-relaxed opacity-90">
          JobSeek is the premier platform for job seekers and recruiters, offering intelligent resume ranking and seamless job posting to streamline the hiring process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button onClick={GetStarted} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
            Get Started
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
      
      {/* Decorative elements to match the office scene */}
      <div className="absolute bottom-0 right-0 w-64 h-32 opacity-20">
        <div className="absolute bottom-4 right-8 w-16 h-16 bg-green-600 rounded-full"></div>
        <div className="absolute bottom-8 right-24 w-20 h-12 bg-yellow-600 rounded-lg"></div>
      </div>
    </section>
  );
}

export default Hero