import { useEffect, useState } from "react";
import { submitExam, takeExam } from "./ExamAPI";
import { useParams } from "react-router-dom";
import { Checkbox, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ExamResult from "./ExamResult";
import ProgressBar from "../common/ProgressBar";
import Countdown from "react-countdown";

export default function Exam() {
    const [examID] = useState(useParams().id);
    const [examName] = useState(useParams().name);
    const [questions, setQuestions] = useState([]);
    const [passingScore, setPassingScore] = useState(0);
    const [score, setScore] = useState(0);
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [checkboxState, setCheckboxState] = useState({});

    const getNextQuestion = async () => {
        questions[index].selectedAnswers = answers;
        await handleSubmit();
        setAnswers([]);
        setCheckboxState({});
        setIndex(index + 1);
    }

    const handleChooseAnswer = (event) => {
        const { id, checked } = event.target;
        const _answers = checked ? [...answers, id] : answers.filter(answer => answer !== id);
        setCheckboxState({ ...checkboxState, [id]: checked });
        setAnswers(_answers);
    }

    const handleSubmit = async (event) => {
        try {
            const score = await submitExam(questions, examID);
            setScore(score);
        } catch (error) {
            console.log(error)
        }
    }

    const counterRenderer = ({ minutes, seconds }) => {
        return <span>{minutes}:{seconds}</span>;
    };

    useEffect(() => {
        const fetchExamQuestions = async () => {
            try {
                const result = await takeExam(examID);
                console.log(result)
                return result;
            } catch (error) {
                console.log(error.message);
                return [];
            }
        }
        fetchExamQuestions()
            .then(data => {
                setQuestions(data.questions || []);
                setPassingScore(data.passing_score);

            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="exam-question-container" >
            {
                questions.length && (
                    index === questions.length ? <ExamResult score={score} passingScore={passingScore} />
                        :
                        <div>
                            <ProgressBar value={(index + 1) / questions.length * 100} />
                            <div className="counter-div">
                                <Countdown date={Date.now() + (questions[index].duration) * 1000} key={index}
                                    onComplete={getNextQuestion}
                                    renderer={counterRenderer} />
                            </div>
                            <Typography className="d-flex row" fontFamily="serif" variant="h3">{index + 1}. {questions[index].name}</Typography>
                            {
                                questions[index].answers.map((answer, index) => {
                                    return <div key={index} id="exam-question-answer">
                                        <Checkbox id={index + 1}
                                            onChange={handleChooseAnswer}
                                            checked={checkboxState[index + 1] === true}
                                        />
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
                )}
        </div>
    );
}