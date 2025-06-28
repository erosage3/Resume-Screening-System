import { useState } from 'react';

export default function JobApplicationForm({ jobId, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'resume' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('resume', formData.resume);

    try {
      const response = await fetch(`http://localhost:8000/jobs/apply/${jobId}`, {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Server error:', result);
        throw new Error(result.message || 'Application failed');
      }

      setMessage('Application submitted successfully!');
      setFormData({ name: '', email: '', phone: '', resume: null });

      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setMessage(error.message || 'Submission failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded border">
      <h3 className="text-lg font-semibold">Apply for this job</h3>
      {message && <p className="text-sm text-red-600">{message}</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        value={formData.name}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        value={formData.phone}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="file"
        name="resume"
        accept=".pdf"
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <div className="flex justify-between items-center">
        <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded">
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className="text-sm text-gray-500">Cancel</button>
        )}
      </div>
    </form>
  );
}
