import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  Poducto,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoPoductoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/poducto', {
    responses: {
      '200': {
        description: 'Pedido has one Poducto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Poducto),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Poducto>,
  ): Promise<Poducto> {
    return this.pedidoRepository.poducto(id).get(filter);
  }

  @post('/pedidos/{id}/poducto', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Poducto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Poducto, {
            title: 'NewPoductoInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) poducto: Omit<Poducto, 'id'>,
  ): Promise<Poducto> {
    return this.pedidoRepository.poducto(id).create(poducto);
  }

  @patch('/pedidos/{id}/poducto', {
    responses: {
      '200': {
        description: 'Pedido.Poducto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Poducto, {partial: true}),
        },
      },
    })
    poducto: Partial<Poducto>,
    @param.query.object('where', getWhereSchemaFor(Poducto)) where?: Where<Poducto>,
  ): Promise<Count> {
    return this.pedidoRepository.poducto(id).patch(poducto, where);
  }

  @del('/pedidos/{id}/poducto', {
    responses: {
      '200': {
        description: 'Pedido.Poducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Poducto)) where?: Where<Poducto>,
  ): Promise<Count> {
    return this.pedidoRepository.poducto(id).delete(where);
  }
}
