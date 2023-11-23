export interface ShiftType {
  id: string;
  title: string;
  start: string;
  end: string;
  className: string;
  overtime?: { hours: number; valid: boolean };
  allDay?: boolean;
}
