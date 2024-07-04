const createStepsTable = `
  CREATE TABLE IF NOT EXISTS steps (
    id INTEGER PRIMARY KEY,
    data TEXT,
    run_id TEXT,
    step_number INTEGER,
    run_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

const insertStep = `
  INSERT INTO steps (data, run_id, step_number, run_timestamp)
  VALUES (?, ?, ?, ?)
`;

const getSteps = `
  SELECT * FROM steps
  WHERE step_number BETWEEN ? AND ?
  ORDER BY step_number ASC;
`;

export enum SqliteQuery {
  CreateStepsTable = createStepsTable,
  InsertStep = insertStep,
  GetSteps = getSteps,
}
