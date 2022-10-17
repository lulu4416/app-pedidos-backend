import {Entity, model, property} from '@loopback/repository';

@model()
export class Poducto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  constructor(data?: Partial<Poducto>) {
    super(data);
  }
}

export interface PoductoRelations {
  // describe navigational properties here
}

export type PoductoWithRelations = Poducto & PoductoRelations;
