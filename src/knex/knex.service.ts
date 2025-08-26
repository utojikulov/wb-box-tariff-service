import knex, { Knex } from "knex";
import { knexConfig } from "./knexfile";

export class KnexService {
  private static instance: Knex | null = null;

  private constructor() {}

  public static getConnection(): Knex {
    if (!KnexService.instance) {
      KnexService.instance = knex(knexConfig.development);
    }
    return KnexService.instance;
  }
}

