import React, { useState } from 'react';

export function Nav(props) {
  return (
    <div className='header'>
      <h1 className='header_text'>Thought</h1>&nbsp;&nbsp;&nbsp;
      <h1 className='header_text'>Box</h1>
    </div>
  );
}

export function Form(props) {
  const [thought, setThought] = useState('');
  const [mode, setMode] = useState('input');
  const [error, setError] = useState('none');

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('/api/thoughts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ thought })
    });
    response.status !== 200 ? setError('submission') : setMode('back to home');
  }

  function returnHome() {
    setThought('');
    setMode('input');
  }

  return (
    <div>
      <form className='form'>
        {error === 'submission' && (
          <h2><em>
          <span>There was an error submitting your thought.</span></em>
        </h2>
        )}
        {mode !== 'back to home' && (
          <>
            <h2>
              Give me your <span>thoughts</span>.
            </h2>
            <input
              type='text'
              value={thought}
              className='text-input'
              onChange={(e) => {
                if (mode === 'input') {
                  setThought(e.target.value);
                }
              }}
              maxLength={1200}
            />
          </>
        )}
        {mode === 'input' && (
          <>
            <h3>{1200 - thought.length} characters remaining</h3>
            <button id='submit-button' onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}
        {mode === 'back to home' && (
          <>
            <button className='view-thoughts-button' onClick={returnHome}>
              Go back home
            </button>
          </>
        )}
      </form>
    </div>
  );
}