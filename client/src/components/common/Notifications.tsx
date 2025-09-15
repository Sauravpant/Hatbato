import React, { useEffect, useRef, useState } from "react";
import { Bell, X, CheckCircle } from "lucide-react";
import type { NotificationProps, Notification } from "@/types/notifications/types";
import { useGetNotifications, useMarkNotificationAsRead, useMarkAllAsRead } from "@/hooks/user/useNotification";

const Notifications: React.FC<NotificationProps> = ({ isAuthenticated }) => {
  const [open, setOpen] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const { data: notifications = [] } = useGetNotifications();

  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  return (
    <div className="relative" ref={notificationRef}>
      <button
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors duration-200"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className="h-5 w-5 text-white dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs h-5 min-w-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed sm:absolute right-0  w-screen max-w-md sm:max-w-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden sm:max-h-64 max-h-[calc(100vh-100px)]"
          style={{
            top: "var(--navbar-height, 60px)",
            right: "var(--notif-right, 0.5rem)",
          }}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <span className="font-semibold text-base">Notifications</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => markAllAsReadMutation.mutate(null)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                disabled={unreadCount === 0}
              >
                <CheckCircle size={14} />
                Mark all read
              </button>
              <button
                onClick={() => setOpen(false)}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label="Close notifications"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto h-full">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-750 ${
                    notification.read ? "text-gray-500 dark:text-gray-400" : "bg-blue-50 dark:bg-blue-900/20 font-medium"
                  }`}
                  onClick={() => markAsReadMutation.mutate({ id: notification.id })}
                >
                  <p className="text-sm">{notification.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
