import { Pool, types } from 'pg';
import dbConfig from './dbConfig';

// Set up custom type parsing for numeric fields
types.setTypeParser(types.builtins.NUMERIC, parseFloat);
types.setTypeParser(types.builtins.FLOAT8, parseFloat);
types.setTypeParser(types.builtins.INT8, parseInt);

export const pool = new Pool(dbConfig);
