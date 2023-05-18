export interface ShiftType {
  id: string;
  title: string;
  start: string;
  end: string;
  className: string;
  overtime: { valid: boolean; amount: number };
}
