import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongooseDbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Persona, Poducto} from '../models';
import {PersonaRepository} from './persona.repository';
import {PoductoRepository} from './poducto.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Pedido.prototype.id>;

  public readonly poducto: HasOneRepositoryFactory<Poducto, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongooseDB') dataSource: MongooseDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('PoductoRepository') protected poductoRepositoryGetter: Getter<PoductoRepository>,
  ) {
    super(Pedido, dataSource);
    this.poducto = this.createHasOneRepositoryFactoryFor('poducto', poductoRepositoryGetter);
    this.registerInclusionResolver('poducto', this.poducto.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
