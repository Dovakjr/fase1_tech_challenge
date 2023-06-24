import { Model, PrimaryKey } from 'sequelize-typescript';
import { Column, Table } from 'sequelize-typescript';

export type ListAttributes = {
  cpf: string;
  name: string;
  email: string;
};

@Table
export class UserModel extends Model<ListAttributes> {
  @PrimaryKey
  @Column
  cpf: string;
  @Column
  name: string;
  @Column
  email: string;
}
