import { useState } from 'react';

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch("http://localhost:8000/jobs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        skills: formData.skills,
        due_date: formData.dueDate,
      }),
    });

    const data = await response.json();
    console.log(token);

    if (response.ok) {
      alert("Job posted successfully!");
      console.log("Server Response:", data);
      
      setFormData({
        title: '',
        description: '',
        skills: '',
        dueDate: '',
      });
    } else {
      console.error("Server Error:", data);
      alert("Failed to post job.");
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert("Something went wrong. Try again.");
  }
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Required Skills (comma-separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Job
        </button>

      </form>
    </div>
  );
}
