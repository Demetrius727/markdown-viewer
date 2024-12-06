import { useState, useEffect, useRef } from 'react';
import { marked } from "marked";
import Toolbar from './components/Toolbar';

function App() {
  const [text, setText] = useState(localStorage.getItem("markdownText") || "# ...")

  const renderText = () => {
    return { __html: marked(text) };
  }

  const textAreaRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("markdownText", text);
  }, [text])

  const insertText = (before, after) => {
    const textArea = textAreaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const previousText = textArea.value;
    const beforeText = previousText.substring(0, start);
    const selectedText = previousText.substring(start, end);
    const afterText = previousText.substring(end);

    const newText = `${beforeText}${before}${selectedText}${after}${afterText}`
    setText(newText);
    textArea.focus();
  }

  return (
    <div className='app-container'>
      <Toolbar insertText={insertText}/>
      <textarea id="editor" ref={textAreaRef} value={text} onChange={(e) => setText(e.target.value)}></textarea>
      <h2>Preview:</h2>
      <div id="preview" dangerouslySetInnerHTML={renderText()} />
    </div>
  )
}

export default App
