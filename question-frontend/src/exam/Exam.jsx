import { useEffect, useState } from "react";
import { submitExam, takeExam } from "./ExamAPI";
import { useParams } from "react-router-dom";
import { Checkbox, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function Exam() {
    const [examID] = useState(useParams().id);
    const [examName] = useState(useParams().name);
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const getNextQuestion = async () => {
        questions[index].selectedAnswers = answers;
        await handleSubmit();
        setAnswers([]);
        setIndex(index + 1);
    }

    const handleChooseAnswer = (event) => {
        const { id, checked } = event.target;
        const _answers = checked ? [...answers, id] : answers.filter(answer => answer !== id);
        setAnswers(_answers);
    }

    const handleSubmit = async (event) => {
        try {
            const score = await submitExam(questions);
            console.log(score);
            return score;
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchExamQuestions = async () => {
            try {
                const questions = await takeExam(examID);
                console.log(questions)
                return questions;
            } catch (error) {
                console.log(error.message);
                return [];
            }
        }
        fetchExamQuestions()
            .then(questions => setQuestions(questions || []))
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="exam-question-container" >
            {
                questions.length &&
                <div>
                    <Typography className="d-flex row" fontFamily="serif" variant="h3">{index + 1}. {questions[index].name}</Typography>
                    {
                        questions[index].answers.map((answer, index) => {
                            return <div key={index} id="exam-question-answer">
                                <Checkbox id={index + 1}
                                onChange={handleChooseAnswer} />
                                {answer.name}
                            </div>
                        })
                    }
                    <div className="next-question-btn">
                        <Button variant="outlined" onClick={getNextQuestion} endIcon={<SendIcon />}>
                            Next
                        </Button>
                    </div>
                </div>
            }
        </div>
    );
}