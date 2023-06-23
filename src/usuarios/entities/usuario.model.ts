import { Model } from 'sequelize-typescript';
import { Column, Table } from 'sequelize-typescript';

export type ListAttributes = {
  name: string;
};

@Table
export class UsuarioModel extends Model<ListAttributes> {
  @Column
  name: string;
}
