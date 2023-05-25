import { DataSource } from 'typeorm'
import TypeOrmClientConfig from './TypeOrmClientConfig';

export type ClientName = string;

export default class TypeOrmClient {
  private static activeClients: Map<ClientName, TypeOrmClient> = new Map();
  private clientBase: DataSource;
  private clientName: ClientName;

  constructor(config: TypeOrmClientConfig) {
    this.clientName = config.name;

    const oldClient = TypeOrmClient.activeClients.get(this.clientName);

    if (oldClient) {
      this.clientBase = oldClient.clientBase;

      return oldClient;
    }

    this.clientBase = new DataSource(config);
  }

  async initialize(): Promise<void> {
    if (!this.isInitialized) {
      await this.clientBase.initialize();
    }

    TypeOrmClient.activeClients.set(this.clientName, this);
  }

  async destroy(): Promise<void> {
    await this.clientBase.destroy();

    TypeOrmClient.activeClients.delete(this.clientName);
  }

  get isInitialized(): boolean {
    return this.clientBase.isInitialized;
  }

  static get activeClientsCount() : number {
    return TypeOrmClient.activeClients.size;
  }
};
