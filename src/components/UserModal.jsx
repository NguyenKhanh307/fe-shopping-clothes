import { useState, useEffect } from "react";
export default function UserModal({ isOpen, onClose, onSubmit, initialName = "" }) {
    const [name, setName] = useState(initialName);
  
    useEffect(() => {
      setName(initialName);
    }, [initialName, isOpen]);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">
            {initialName ? "Cập nhật User" : "Thêm User mới"}
          </h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên..."
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              onClick={() => onSubmit(name)}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    );
  }