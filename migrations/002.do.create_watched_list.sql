CREATE TABLE watched_list (
  movie_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id INTEGER REFERENCES mls_users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  date_added TIMESTAMP DEFAULT now() NOT NULL,
  date_watched TIMESTAMP NOT NULL,
  recommendation TEXT NOT NULL
);