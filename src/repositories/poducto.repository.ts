import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongooseDbDataSource} from '../datasources';
import {Poducto, PoductoRelations} from '../models';

export class PoductoRepository extends DefaultCrudRepository<
  Poducto,
  typeof Poducto.prototype.id,
  PoductoRelations
> {
  constructor(
    @inject('datasources.mongooseDB') dataSource: MongooseDbDataSource,
  ) {
    super(Poducto, dataSource);
  }
}
