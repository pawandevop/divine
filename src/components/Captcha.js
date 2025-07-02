import { useState, useEffect } from 'react';

/**
 * Captcha component for simple math-based human verification.
 * Props:
 *   - enabled: boolean (show/hide the captcha)
 *   - onValidate: function (called with true/false when answer is validated)
 * Usage: <Captcha enabled={true} onValidate={setCaptchaValid} />
 */
export default function Captcha({ enabled = true, onValidate }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [expected, setExpected] = useState(null);
  const [error, setError] = useState('');

  // Generate a new question when enabled changes
  useEffect(() => {
    if (enabled) {
      generateQuestion();
    }
  }, [enabled]);

  // Generates a random math question
  function generateQuestion() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setQuestion(`${a} + ${b} = ?`);
    setExpected(a + b);
    setAnswer('');
    setError('');
    if (onValidate) onValidate(false);
  }

  // Handle input change
  function handleChange(e) {
    setAnswer(e.target.value);
    setError('');
    if (onValidate) onValidate(false);
  }

  // Validate answer on blur
  function handleBlur() {
    if (parseInt(answer, 10) === expected) {
      setError('');
      if (onValidate) onValidate(true);
    } else {
      setError('Incorrect answer.');
      if (onValidate) onValidate(false);
    }
  }

  if (!enabled) return null;

  // Centered captcha UI
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '18px 0 10px 0', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', width: '100%' }}>
        <label style={{ fontWeight: 500, fontSize: 16, minWidth: 110 }}>Captcha: {question}</label>
        <input
          type="number"
          value={answer}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            width: 60,
            padding: '6px 8px',
            border: '1.5px solid #bbb',
            borderRadius: 6,
            fontSize: 15,
            outline: 'none',
            textAlign: 'center',
            marginLeft: 4,
            marginRight: 4,
            background: '#fafbfc',
            boxShadow: '0 1px 2px #0001',
            transition: 'border 0.2s',
          }}
          required
        />
        <button
          type="button"
          onClick={generateQuestion}
          style={{
            marginLeft: 4,
            background: '#f3b805',
            border: 'none',
            borderRadius: 6,
            padding: '6px 10px',
            cursor: 'pointer',
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 2px #0001',
            transition: 'background 0.2s',
          }}
          aria-label="Refresh Captcha"
        >
          ↻
        </button>
      </div>
      {error && <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{error}</div>}
    </div>
  );
} 