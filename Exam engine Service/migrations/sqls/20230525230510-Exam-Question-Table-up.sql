/* Replace with your SQL commands */
CREATE TABLE exam_question(
    examID BIGINT,
    questionID BIGINT, 
    CONSTRAINT fk_exam
        FOREIGN KEY (examID)
        REFERENCES exam (id)
        ON DELETE CASCADE
);