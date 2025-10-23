import React, { useState, useEffect } from "react";

export default function ModalQuestion({ open, question, onSubmit }) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(""); // "", "correct", "wrong"
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (open) {
      setAnswer("");
      setStatus("");
      setShake(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const correct =
      answer.trim().toLowerCase() === (question?.a || "").trim().toLowerCase();

    if (correct) {
      setStatus("correct");
      setTimeout(() => onSubmit(answer), 700); // tiếp tục sau 0.7s
    } else {
      setStatus("wrong");
      setShake(true);
      setTimeout(() => {
        setShake(false);
        onSubmit(answer);
      }, 900); // rung rồi gửi kết quả sai
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold">Câu hỏi nhanh</h3>
        <p className="mt-2 text-slate-600">{question?.q}</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            className={`w-full rounded-lg border px-3 py-2 outline-none transition-all duration-300 
              ${
                status === "correct"
                  ? "border-green-500 bg-green-50"
                  : status === "wrong"
                  ? "border-red-500 bg-red-50"
                  : "border-slate-300 focus:ring-2 focus:ring-slate-500"
              } 
              ${shake ? "animate-shake" : ""}`}
            placeholder="Nhập câu trả lời..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
            >
              Trả lời
            </button>
          </div>
        </form>
      </div>

      {/* CSS inline cho hiệu ứng shake */}
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
