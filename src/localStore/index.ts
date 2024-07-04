import sqlite3, {Database} from 'sqlite3';
import {SqliteQuery} from './queries.js';
import {mkdirSync} from 'fs';
import {Step} from '../canvas/step.js';

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
        console.log(error);
      }
    );
  }

  getSteps(startStepNumber: number, endStepNumber: number) {
    this.db.all(
      SqliteQuery.GetSteps,
      [startStepNumber, endStepNumber],
      (_err, rows) => {
        // TODO: return rows from here
        console.log(rows);
      }
    );
  }
}

const localStore = new LocalStore();

export default localStore;
