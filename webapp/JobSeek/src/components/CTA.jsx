import { Link } from "react-router-dom"

function CTA() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Find Your Next Opportunity?
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Join JobSeek today and take the next step in your career.
        </p>
        <Link to={"./login"}>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
          Sign Up Now
        </button>
        </Link>
        
      </div>
    </section>
  );
}

export default CTA