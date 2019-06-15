BEGIN;

INSERT INTO mls_users (user_name, password)
VALUES
  ('jespinosa', '$2a$12$WvcDhMWc/0NpLJxk4ivDhemTHCPdL5k4eSrCIFVMBOk9EM1SL/mZ.'),
  ('steverogers', '$2a$12$Ql9GtXuTFMVSOUmkUcj0VOqhfcHxbPeP7XfXCF/QpsxcY9MDw2obi'),
  ('tonystark', '$2a$12$pPVk5CMXQzUNJMVRg8fnI.KZCqm.Nc8Mu0D7.KUzYskRUNJAeNaP.');

INSERT INTO watched_list (user_id, title, url, date_watched, recommendation)
VALUES
  ('1', 'The Avengers', 'http://google.com', '06-15-2019', 'recommend'),
  ('2', 'The Avengers: Endgame', 'http://google.com', '06-15-2019', 'recommend'),
  ('3', 'The Avengers: Age of Ultron', 'http://google.com', '06-15-2019', 'recommend'),
  ('1', 'Star Wars', 'http://google.com', '06-15-2019', 'recommend'),
  ('2', 'Booksmart', 'http://google.com', '06-15-2019', 'recommend'),
  ('3', 'John Wick', 'http://google.com', '06-15-2019', 'recommend');

COMMIT;