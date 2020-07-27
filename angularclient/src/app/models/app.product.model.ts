export class Product {
  constructor(
    public ProductRowId: number,
    public ProductId: string,
    public ProductName: string,
    public CategoryName: string,
    public Manufacturer: string,
    public Description: string,
    public BasePrice: number
  ){}
}
export const Categories = ['Electronics', 'Electrical', 'Food'];
export const Manufacturers = ['MS-Electronics', 'LS-Electrical',
  'TS-Foods', 'VB-Electronics', 'PB-Electrical',
'AB-Food'];
