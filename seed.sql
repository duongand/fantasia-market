CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email varchar NOT NULL,
  password varchar NOT NULL,
  create_date timestamptz DEFAULT NOW()
);

CREATE TABLE balance (
  id SERIAL PRIMARY KEY,
  balance money NOT NULL,
  user_id int REFERENCES users(id) NOT NULL
);

create table stocks (
  id SERIAL PRIMARY KEY,
  company_name varchar NOT NULL,
  stock_symbol varchar NOT NULL,
  amount_own int NOT NULL,
  user_id int REFERENCES users(id) NOT NULL
);
