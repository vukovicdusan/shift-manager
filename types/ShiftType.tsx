export interface ShiftType {
  id: string;
  title: string;
  start: string;
  end: string;
  className: string;
  overtime?: { hours: number; authorized: boolean };
  allDay?: boolean;
}
