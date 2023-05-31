/* Replace with your SQL commands */
CREATE TABLE exam_student(
                   id SERIAL PRIMARY KEY,
                   stdID BIGINT,
                   examID BIGINT,
                   is_started BOOLEAN
                   score DECIMAL NOT NULL DEFAULT 0,
                   start_time TIMESTAMP,
                   end_time TIMESTAMP,
                   CONSTRAINT fk_exam
                        FOREIGN KEY (examID)
                        REFERENCES exam (id)
                        ON DELETE CASCADE);