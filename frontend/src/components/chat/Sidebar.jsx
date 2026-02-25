import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ onlinePeople = {}, offlinePeople = {}, onSelect, selectedUserId }) => {
  const [localOnline, setLocalOnline] = useState({});
  const [localOffline, setLocalOffline] = useState({});
  const [loading, setLoading] = useState(false);

  const renderRow = (p) => (
    <button
      key={p._id}
      onClick={() => onSelect && onSelect(p._id)}
      className={`w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 smooth ${selectedUserId === p._id ? 'bg-white/5' : ''}`}
    >
      <img src={p.avatarLink || '/favicon.ico'} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{p.username || p.name || 'Unknown'}</div>
          {p.unread > 0 && (
            <span className="text-xs bg-secondary text-black px-2 py-0.5 rounded-full">{p.unread}</span>
          )}
        </div>
        <div className="text-xs text-gray-300 truncate">{p.lastMessage || ''}</div>
      </div>
    </button>
  );

  useEffect(() => {
    // If parent provided data, use it
    if (Object.keys(onlinePeople || {}).length || Object.keys(offlinePeople || {}).length) {
      setLocalOnline(onlinePeople);
      setLocalOffline(offlinePeople);
      return;
    }

    // Otherwise fetch people list from API
    let cancelled = false;
    setLoading(true);
    axios
      .get("/api/user/people")
      .then((res) => {
        if (cancelled) return;
        const data = res.data || [];

        const online = {};
        const offline = {};

        data.forEach((p) => {
          if (p.online) online[p._id] = p;
          else offline[p._id] = p;
        });

        setLocalOnline(online);
        setLocalOffline(offline);
      })
      .catch((err) => {
        console.error("Error fetching people for sidebar", err);
      })
      .finally(() => setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [onlinePeople, offlinePeople]);

  const onlineList = Object.values(localOnline);
  const offlineList = Object.values(localOffline);

  return (
    <div className="card h-[80vh] overflow-auto no-scrollbar">
      <div className="mb-3">
        <input aria-label="Search contacts" placeholder="Search" className="w-full bg-transparent border border-gray-700 rounded-lg p-2 text-sm" />
      </div>

      <div className="mb-2 text-xs text-gray-400">Online</div>
      <div className="flex flex-col gap-1">
        {loading && <div className="text-sm text-gray-400">Loading...</div>}
        {!loading && (onlineList.length ? onlineList.map(renderRow) : <div className="text-sm text-gray-400">No one online</div>)}
      </div>

      <div className="mt-4 mb-2 text-xs text-gray-400">Others</div>
      <div className="flex flex-col gap-1">
        {loading && <div className="text-sm text-gray-400">&nbsp;</div>}
        {!loading && (offlineList.length ? offlineList.map(renderRow) : <div className="text-sm text-gray-400">No other users</div>)}
      </div>
    </div>
  );
};

export default Sidebar;
