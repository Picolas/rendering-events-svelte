export interface Event {
  id: number;
  start: Date;
  duration: number; // en minutes
  top: number;
  height: number;
  width: number;
  left: number;
  backgroundColor: any;
}

export function createEvent(id: number, startTime: string, duration: number): Event {
  const [hours, minutes] = startTime.split(':').map(Number);
  const start = new Date();
  start.setHours(hours, minutes, 0, 0);

  return {
    id,
    start,
    duration,
    top: 0,
    height: 0,
    width: 0,
    left: 0,
    backgroundColor: ''
  };
};