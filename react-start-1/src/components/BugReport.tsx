import React, { ChangeEvent, FormEvent, useState } from 'react';

interface BugReport {
  title: string;
  description: string;
}

const BugReport: React.FC = () => {
  const [bug, setBug] = useState<BugReport>({
    title: '',
    description: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setBug((prevBug) => ({ ...prevBug, [name]: value }));
  };

  

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const apiEndpoint = 'https://example.com/api/bug-report'; // Replace with URL later.

    try {

      console.log('Submitting bug report:', bug);

      
      console.log('Bug report submitted successfully!');
      setBug({ title: '', description: '' }); // Redirect to confirm page later.
      
    } catch (error) {
      
      console.error('Error happened, rip.', error);
    }
  };

  return (
    <div>
      <h1>Report a Bug</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Bug Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bug.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Bug Description:</label>
          <textarea
            id="description"
            name="description"
            value={bug.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BugReport;
