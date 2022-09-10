export interface Column {
  id: number | string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
}
