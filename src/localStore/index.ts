import sqlite3, {Database} from 'sqlite3';
import {SqliteQuery} from './queries.js';
import {mkdirSync} from 'fs';
import {Step} from '../canvas/step.js';
import {StepRow} from './types.js';
import {logError} from '../utils/log.js';

class LocalStore {
  db: Database;

  constructor() {
    mkdirSync('./db', {recursive: true});
    this.db = new sqlite3.Database('./db/code-canvas.db');
  }

  init() {
    this.db.run(SqliteQuery.CreateStepsTable);
  }

  saveStep(step: Step, runId: string, stepNumber: number, runTimestamp: Date) {
    this.db.run(
      SqliteQuery.InsertStep,
      [JSON.stringify(step), runId, stepNumber, runTimestamp.toISOString()],
      error => {
        if (error) {
          logError(`Save step failed ${error?.message}`);
        }
      }
    );
  }

  getSteps(
    startStepNumber: number,
    endStepNumber: number,
    runId: string
  ): Promise<StepRow[]> {
    return new Promise(resolve => {
      const getStepsQueryValues = [startStepNumber, endStepNumber, runId];
      const getStepsCallback = (_err: Error | null, rows: StepRow[]) => {
        resolve(rows);
      };

      this.db.all(SqliteQuery.GetSteps, getStepsQueryValues, getStepsCallback);
    });
  }
}

const localStore = new LocalStore();

export default localStore;
