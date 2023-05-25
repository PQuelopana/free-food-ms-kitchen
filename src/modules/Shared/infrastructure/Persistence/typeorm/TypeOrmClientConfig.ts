export default interface TypeOrmClientConfig {
  name: string,
  type: 'postgres',
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};
