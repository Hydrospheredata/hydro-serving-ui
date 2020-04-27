export type CmpOperators = 'Eq' | 'NotEq' | 'Greater' | 'Less' | 'GreaterEq' | 'LessEq';
export const cmpOperators: Array<{ kind: CmpOperators }> = [
  { kind: 'Eq' },
  { kind: 'NotEq' },
  { kind: 'Greater' },
  { kind: 'Less' },
  { kind: 'GreaterEq' },
  { kind: 'LessEq' },
];
