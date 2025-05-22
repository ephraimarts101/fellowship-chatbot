import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';

function App() {
  const [chatLog, setChatLog] = useState([
    { text: 'Hello! I am your Fellowship finder assistant. I can help you discover fellowships near your location.', origin: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isChatVisible, setIsChatVisible] = useState(false);

  const send = async (inputText) => {
    const content = inputText ?? inputValue.trim();
    if (!content) return;

    const userEntry = {
      text: content,
      origin: 'user',
    };
    setChatLog((prevMsgs) => [...prevMsgs, userEntry]);

    try {
      const result = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'USER_001',
          message: content,
        }),
      });

      if (result.ok && result.headers.get('content-type')?.includes('application/json')) {
        const replies = await result.json();
        replies.forEach((reply) => {
          if (reply.text) {
            setChatLog((prevMsgs) => [
              ...prevMsgs,
              {
                text: reply.text || '',
                origin: 'bot'
              },
            ]);
          }
        });
      }
    } catch (error) {
      console.error('Rasa server error:', error);
    }

    setInputValue('');
  };

  const displayMessage = (msg) => (
    <div>
      {msg.text && (
        <div className="whitespace-pre-line">{msg.text}</div>
      )}
    </div>
  );

  return (
    <div className="fixed bottom-20 right-6 z-50">
      {isChatVisible && (
        <div className="w-[470px] h-[520px] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
          <div className="bg-stone-100 relative text-stone-950 p-4 flex gap-3 items-center">
            <div className="text-indigo-50 bg-indigo-800 px-3 py-2 rounded-full font-semibold">
              <i className='bi bi-chat-right-text text-md'></i>
            </div>
            <div>
              <div className='font-semibold'>Fellowship Assistant</div>
              <div className='text-xs text-green-600'> • Online</div>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {chatLog.map((message, idx) => (
              <div
                key={idx}
                className={`mx-10 px-4 py-2 rounded-xl text-sm ${
                  message.origin === 'user'
                    ? 'ml-auto bg-indigo-800 text-stone-50 max-w-[45%]'
                    : 'mr-auto bg-stone-100 text-gray-900 max-w-[65%]'
                }`}
              >
                {displayMessage(message)}
              </div>
            ))}
          </div>

          <div className="flex items-center p-2 border-t border-gray-200">
            <input
              type="text"
              className="flex-1 px-4 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button
              onClick={() => send()}
              className="ml-2 bg-indigo-800 text-white px-4 py-2 text-sm rounded-lg"
            >
              <i className="bi bi-send-fill text-md"></i>
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setIsChatVisible((prev) => !prev)}
        className="bg-indigo-800 hover:bg-indigo-900 text-white fixed bottom-6 right-6 px-4 py-2 mt-10 rounded-lg shadow-xl ">
        <i className={`bi ${isChatVisible ? 'bi-x-circle' : 'bi bi-chat-dots-fill'} text-md`}></i>
      </button>
    </div>
  );
}

export default App;
