import React, { useState, useEffect } from "react";

const ChatLayout = ({ sidebar, children }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) setOpen(false);
    }

    if (open) {
      window.addEventListener("keydown", onKey);
    }

    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="container-max flex gap-4 py-6">
        {/* Mobile header toggle */}
        <div className="md:hidden mb-4 w-full flex items-center justify-between">
          <button
            aria-label="Open sidebar"
            onClick={() => setOpen(true)}
            className="p-2 rounded-md bg-surface"
          >
            ☰
          </button>
          <div className="text-lg font-semibold">Swift Chat</div>
        </div>

        {/* Sidebar - collapses on small screens */}
        <aside className={`hidden md:block w-80 lg:lg-sidebar`}>{sidebar}</aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-80 p-4">
              <div className="h-full overflow-auto">{sidebar}</div>
            </div>
          </div>
        )}

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default ChatLayout;
