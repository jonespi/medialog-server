CREATE TABLE watched_list (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT,
  date_added TIMESTAMP DEFAULT now() NOT NULL,
  date_watched TIMESTAMP DEFAULT now() NOT NULL
);