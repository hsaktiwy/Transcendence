CREATE TABLE user (
  id_user SERIAL PRIMARY KEY,
  login VARCHAR(30),
  FirstName VARCHAR(30),
  LastName VARCHAR(30),
  email VARCHAR(255),
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(255)
);

CREATE TABLE message (
  id_message SERIAL PRIMARY KEY,
  id_user_fk INT REFERENCES user(id_user),
  id_channel_fk INT REFERENCES channel(id_channel),
  content TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE channel (
  id_channel SERIAL PRIMARY KEY,
  id_user1_fk INT REFERENCES user(id_user),
  id_user2_fk INT REFERENCES user(id_user),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notification (
  id_notification SERIAL PRIMARY KEY,
  id_user_fk INT REFERENCES user(id_user),
  content VARCHAR(80),
  type VARCHAR(20) -- system, friendship, gameInvitation, tournament
);

CREATE TABLE ProfileStatus (
  id_status SERIAL PRIMARY KEY,
  id_user_fk INT REFERENCES user(id_user),
  total_games INT,
  wins INT,
  losses INT,
  rank INT
);

CREATE TABLE game (
  id_game SERIAL PRIMARY KEY,
  id_player1_fk INT REFERENCES user(id_user),
  id_player2_fk INT REFERENCES user(id_user),
  game_status VARCHAR(20), -- waiting, in_progress, ended
  winner_id INT REFERENCES user(id_user),
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP
);

CREATE TABLE gameStatus (
  id_game_fk INT REFERENCES game(id_game)
);

CREATE TABLE game_invitation (
  id_invitation SERIAL PRIMARY KEY,
  id_game_fk INT REFERENCES game(id_game),
  id_user_from_fk INT REFERENCES user(id_user),
  id_user_to_fk INT REFERENCES user(id_user),
  status VARCHAR(20), -- pending, accepted, declined
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendship (
  id_friendship SERIAL PRIMARY KEY,
  id_user1_fk INT REFERENCES user(id_user),
  id_user2_fk INT REFERENCES user(id_user),
  status VARCHAR(20), -- pending, accepted, declined, blocked
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tournament (
  id_tournament SERIAL PRIMARY KEY,
  start TIMESTAMP,
  end TIMESTAMP
);

CREATE TABLE tournament_participant (
  id_tournament_fk INT REFERENCES tournament(id_tournament),
  id_user_fk INT REFERENCES user(id_user),
  PRIMARY KEY (id_tournament_fk, id_user_fk)
);
