import React, { useEffect } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface NotificationProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<{ notification: Notification; onRemove: (id: string) => void }> = ({ 
  notification, 
  onRemove 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return (
          <div className="flex-shrink-0 w-50 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-white border-l-4 border-green-500 shadow-lg hover:shadow-xl';
      case 'error':
        return 'bg-white border-l-4 border-red-500 shadow-lg hover:shadow-xl';
      default:
        return 'bg-white border-l-4 border-blue-500 shadow-lg hover:shadow-xl';
    }
  };

  return (
    <div
      className={`
        ${getStyles()}
        max-w-sm w-full rounded-lg pointer-events-auto overflow-hidden
        transform transition-all duration-500 ease-out
        animate-slide-in-right
        hover:scale-[1.02] transition-transform duration-200
      `}
    >
      <div className="p-4 ">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-100 flex-1">
            <p className="text-sm font-medium text-gray-900 leading-5">
              {notification.message}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Just now
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200 rounded-md p-1 hover:bg-gray-100"
              onClick={() => onRemove(notification.id)}
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div 
          className={`
            h-full transition-all duration-[4000ms] ease-linear
            ${notification.type === 'success' ? 'bg-green-500' : 
              notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}
          `}
          style={{
            animation: 'shrink-width 4s linear forwards'
          }}
        />
      </div>
    </div>
  );
};

const Notifications: React.FC<NotificationProps> = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-3 pointer-events-none">
      <div className="space-y-3 pointer-events-auto">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            style={{
              zIndex: 50 - index,
              marginBottom: index === 0 ? '0' : '-1rem'
            }}
          >
            <NotificationItem
              notification={notification}
              onRemove={onRemove}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Notifications, type Notification };
