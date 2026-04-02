import { useRef, useState } from "react";

export default function ChatInput({ input, onInputChange, onSend, onImageSelect }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        setPreview(dataUrl);
        onImageSelect?.(dataUrl, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    onSend();
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="border-t border-border bg-white">
      {preview && (
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-2">
            <img
              src={preview}
              alt="Preview"
              className="h-16 w-16 object-cover rounded-lg"
            />
            <button
              onClick={() => {
                setPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                onImageSelect?.(null, null);
              }}
              className="ml-auto text-red-500 hover:text-red-600 text-sm"
            >
              Remove ✕
            </button>
          </div>
        </div>
      )}
      <div className="p-4 flex gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-secondary px-3 py-2.5 flex-shrink-0"
          title="Upload image"
        >
          📎
        </button>
        <input
          className="input flex-1 text-sm"
          placeholder="Ask about symptoms, health tips, doctors..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
        />
        <button
          onClick={handleSend}
          className="btn-primary px-4 py-2.5 flex-shrink-0"
        >
          Send ↗
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
