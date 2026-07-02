export type Customer = {
  id: string;
  name: string;
  email: string;
};

export function mapCustomer(row: any): Customer {
  return (
    row &&
    ({
      id: row.id,
      name: row.name,
      email: row.email,
    } as Customer)
  );
}
