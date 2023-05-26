/* Replace with your SQL commands */
CREATE TABLE exam(id SERIAL PRIMARY KEY,
                   creatorID BIGINT,
                   name VARCHAR(100) UNIQUE NOT NULL,
                   passing_score DECIMAL NOT NULL,
                   duration DECIMAL NOT NULL);