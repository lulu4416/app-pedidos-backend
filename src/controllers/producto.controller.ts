import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Poducto} from '../models';
import {PoductoRepository} from '../repositories';

export class ProductoController {
  constructor(
    @repository(PoductoRepository)
    public poductoRepository : PoductoRepository,
  ) {}

  @post('/poductos')
  @response(200, {
    description: 'Poducto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Poducto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Poducto, {
            title: 'NewPoducto',
            exclude: ['id'],
          }),
        },
      },
    })
    poducto: Omit<Poducto, 'id'>,
  ): Promise<Poducto> {
    return this.poductoRepository.create(poducto);
  }

  @get('/poductos/count')
  @response(200, {
    description: 'Poducto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Poducto) where?: Where<Poducto>,
  ): Promise<Count> {
    return this.poductoRepository.count(where);
  }

  @get('/poductos')
  @response(200, {
    description: 'Array of Poducto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Poducto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Poducto) filter?: Filter<Poducto>,
  ): Promise<Poducto[]> {
    return this.poductoRepository.find(filter);
  }

  @patch('/poductos')
  @response(200, {
    description: 'Poducto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Poducto, {partial: true}),
        },
      },
    })
    poducto: Poducto,
    @param.where(Poducto) where?: Where<Poducto>,
  ): Promise<Count> {
    return this.poductoRepository.updateAll(poducto, where);
  }

  @get('/poductos/{id}')
  @response(200, {
    description: 'Poducto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Poducto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Poducto, {exclude: 'where'}) filter?: FilterExcludingWhere<Poducto>
  ): Promise<Poducto> {
    return this.poductoRepository.findById(id, filter);
  }

  @patch('/poductos/{id}')
  @response(204, {
    description: 'Poducto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Poducto, {partial: true}),
        },
      },
    })
    poducto: Poducto,
  ): Promise<void> {
    await this.poductoRepository.updateById(id, poducto);
  }

  @put('/poductos/{id}')
  @response(204, {
    description: 'Poducto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() poducto: Poducto,
  ): Promise<void> {
    await this.poductoRepository.replaceById(id, poducto);
  }

  @del('/poductos/{id}')
  @response(204, {
    description: 'Poducto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.poductoRepository.deleteById(id);
  }
}
