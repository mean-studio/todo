import { Pool } from "pg";
import { CreateTables } from '../sql_scripts/create_tables';
class DbService {
  connectionString: string = process.env.DATABASE_URL
  client: Pool
  constructor() {
    if (!this.connectionString) throw new Error('db string is required to run this app')
    this.client = new Pool({
      connectionString: this.connectionString,
    });
    this.connect()
  }
  async connect() {
    await this.client.connect();
    this.client.query(CreateTables).catch((e) => {
      // tslint:disable-next-line:no-console
      console.error(e);
    });
  }
  async execute(text: any, ...values: any) {
    const query: PsqlQuery = { text, values }
    await this.client.connect();
    return this.client.query(query)
  }
}
export const dbService = new DbService()