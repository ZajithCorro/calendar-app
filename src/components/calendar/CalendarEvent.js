import React from 'react';

export default function CalendarEvent({ event }) {
  const { title, user } = event;
  return (
    <div>
      <strong> {title} </strong>
      <span>- {user.name}</span>
    </div>
  );
}
