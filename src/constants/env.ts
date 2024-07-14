import assert, {AssertionError} from 'assert';
import dotenv from 'dotenv';
import {logError} from '../utils/log.js';

export const {NODE_ENV = 'development'} = process.env;

// Load environment variables
dotenv.config({path: `.env.${NODE_ENV}`});

export const {PORT, PING_ROUTE} = process.env;

const requiredVariables = [PORT];

try {
  // All environtment variables must be defined
  assert.equal(
    requiredVariables.some(e => e === undefined),
    false
  );
} catch (error) {
  if (error instanceof AssertionError) {
    logError('Missing environment variables');
  }

  throw error;
}
