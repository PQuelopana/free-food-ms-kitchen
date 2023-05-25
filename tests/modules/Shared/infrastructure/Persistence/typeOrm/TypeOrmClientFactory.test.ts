import factory from '../../../../../../src/modules/Shared/infrastructure/Persistence/typeorm/TypeOrmClientFactory';
import TypeOrmClient from '../../../../../../src/modules/Shared/infrastructure/Persistence/typeorm/TypeOrmClient';

describe('TypeOrmClientFactory tests', () => {
  let client: TypeOrmClient;

  beforeEach(async () => {
    client = await factory.createClient('test', { host: 'localhost', port: 5432, username: 'postgres', password: 'strapi', database: 'free_food_orders' });
  });

  afterEach(async () => {
    await client.destroy();
  });

  it('Creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(TypeOrmClient);
    expect(client.isInitialized).toBeTruthy();
  });

  it('Creates a new client if it does not exist a client with the given name', async () => {
    const newClient = await factory.createClient('test2', { host: 'localhost', port: 5432, username: 'postgres', password: 'strapi', database: 'free_food_orders' });

    expect(newClient).not.toBe(client);
    expect(client.isInitialized).toBeTruthy();

    await newClient.destroy();
  });

  it('Returns a client if it already exists', async () => {
    const previousCount = TypeOrmClient.activeClientsCount;

    const newClient = await factory.createClient('test', { host: 'localhost', port: 5432, username: 'postgres', password: 'strapi', database: 'free_food_orders' });

    expect(newClient).toBe(client);
    expect(newClient.isInitialized).toBeTruthy();
    expect(previousCount).toEqual(TypeOrmClient.activeClientsCount);
  });
});
