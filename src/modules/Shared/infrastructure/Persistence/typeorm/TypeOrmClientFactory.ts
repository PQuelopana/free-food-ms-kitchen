import TypeOrmClient, { ClientName } from './TypeOrmClient';
import TypeOrmConfig from './TypeOrmConfig';

export default class TypeOrmClientFactory {
  static async createClient(clientName: ClientName, config: TypeOrmConfig): Promise<TypeOrmClient> {
    const client = new TypeOrmClient({
      name: clientName,
      type: 'postgres',
      ...config,
    });

    await client.initialize();
    
    return client;
  }
};
