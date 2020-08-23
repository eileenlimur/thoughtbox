import React, { useState } from "react";

export function Nav(props) {
  return (
    <div className="header">
      <h1 className="header_text">Thought</h1>&nbsp;&nbsp;&nbsp;
      <h1 className="header_text">Box</h1>
    </div>
  );
}

export function Form(props) {
  const [thought, setThought] = useState("");
  const [mode, setMode] = useState("input");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('/api/thoughts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.text();
    console.log(body);
    setMode("back to home");
  }

  function handleReject() {
    setThought('');
    setMode("input");
  }

  return (
    <div>
      <form className="form">
        {mode !== "back to home" && (
          <>
            <h2>
              Give me your <span>thoughts</span>.
            </h2>
            <input
              type="text"
              value={thought}
              className="text-input"
              onChange={(e) => {
                if (mode === "input") {
                  setThought(e.target.value);
                }
              }}
              maxLength={1200}
            />
          </>
        )}
        {mode === "input" && (
          <>
            <h3>{1200 - thought.length} characters remaining</h3>
            <button id="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}
        {mode === "back to home" && (
          <>
            <button className="view-thoughts-button" onClick={handleReject}>
              Go back home
            </button>
          </>
        )}
      </form>
    </div>
  );
}