// voorbeeld voor Type[V]
type Type1 = {
  a: number;
  b: string;
};

const typeVExample: Type1['a'] = {} as any;

// keyof keyword
interface IInterface1 {
  a: string;
  b: number;
}

function keyofExample(t: keyof IInterface1) {}
keyofExample('a');
