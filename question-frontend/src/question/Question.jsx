import './Question.css';
import InputField from '../common/InputField';
import AnswerList from '../answer/AnswerList';
import { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import { createQuestion, getQuestionById, updateQuestion } from './QuestionAPI';
import { useParams } from 'react-router-dom';
import TimedModal from '../common/TimedModal';
import CircularIndeterminate from './../common/CircularIndeterminate';

const questionObj = {
    name: '',
    mark: 0,
    category: '',
    subCategory: '',
    expectedTime: '',
    correctAnswers: [],
}

const answerObj = {
    id: 1,
    name: '',
    description: ''
}

export default function Question({ isCreate }) {
    const [qID, setQID] = useState(useParams().id);
    const [answers, setAnswers] = useState([answerObj]);
    const [question, setQuestion] = useState(questionObj);
    const [message, setMessage] = useState('');
    const [freeze, setFreze] = useState(false);

    const handleAnswerChange = (event, index) => {
        const { name, value } = event.target;
        const answerArray = answers.map(((answer, ansIndex) => {
            if (index === ansIndex) {
                answer[name] = value;
            }
            return answer;
        }));

        setAnswers(answerArray);
    }

    const setInfoMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 1000);
    }

    const addAnswer = () => {
        const answer = {
            id: '',
            name: '',
            description: ''
        };
        setAnswers([...answers, answer]);
    }

    const handleQuestionChange = (event) => {
        const { name, value } = event.target;
        setQuestion({ ...question, [name]: value });
    }

    const validateQuestionFields = () => {
        for (const prop in question) {
            if (question[prop].length === 0) {
                throw new Error('All Fields are Required.');
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            validateQuestionFields();
            const correctAnswers = question.correctAnswers.split(',');
            const obj = {
                ...question,
                correctAnswers,
                answers
            };
            setFreze(true);
            await createQuestion(obj);
            setFreze(false);
            setInfoMessage('Created Successfully.')
        } catch (error) {
            setFreze(false);
            setInfoMessage(error.message);
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            validateQuestionFields();
            const correctAnswers = (question.correctAnswers).toString().split(',');
            const obj = {
                ...question,
                correctAnswers,
                answers,
                id: qID
            };
            setFreze(true);
            const updatedQuestion = await updateQuestion(obj);
            setFreze(false);
            setQuestion(updatedQuestion);
            setAnswers(updatedQuestion.answers)
            setInfoMessage('Updated!')
        } catch (error) {
            setFreze(false);
            setInfoMessage(error.message);
        }
    }

    useEffect(() => {
        const getQuestion = async (id) => {
            try {
                const question = await getQuestionById(id);
                return question;
            } catch (error) {
                setInfoMessage(error.message);
            }
        }

        if (isCreate === false) {
            getQuestion(qID)
                .then(question => {
                    setQuestion(question);
                    setAnswers(question.answers);
                })
                .catch(error => console.log(error));
        } else {
            setQuestion(questionObj);
            setAnswers([answerObj]);
        }
    }, [isCreate, qID]);


    return (
        <div className='container'>
            <form>
                <div className='d-flex'>
                    <InputField id="qName" type="text" name="name" label="Question Name" placeholder="Question Name"
                        value={question.name} onChange={handleQuestionChange} />
                    <InputField id="qMark" type="text" name="mark" label="Mark" placeholder="0"
                        value={question.mark} onChange={handleQuestionChange} />

                </div>

                <div className='d-flex'>
                    <InputField id="qCategory" type="text" name="category" label="Category" placeholder="Multiple Choice"
                        value={question.category} onChange={handleQuestionChange} />
                    <InputField id="qSubCategory" type="text" name="subCategory" label="Sub Category" placeholder="HPC"
                        value={question.subCategory} onChange={handleQuestionChange} />

                </div>

                <div className='d-flex'>
                    <InputField id="qExpectedTime" type="text" name="expectedTime" label="Expected Time" placeholder="Time in Seconds"
                        value={question.expectedTime} onChange={handleQuestionChange}
                    />
                    <InputField id="qCorrectAnswers" type="text" name="correctAnswers" label="Correct Answers" placeholder="1, 3, 5"
                        value={question.correctAnswers} onChange={handleQuestionChange} />

                </div>

                <hr />
                <AnswerList answers={answers} setAnswers={setAnswers} onAddAnswer={addAnswer} handleAnswerChange={handleAnswerChange} />
                {
                    freeze &&
                    <CircularIndeterminate />
                }
                <div className='d-flex'>
                    {
                        isCreate ?
                            <Fab variant="extended" type='submit' color="success" aria-label="add"
                                sx={{ mt: 3 }} onClick={handleSubmit} disabled={freeze}>
                                Create
                            </Fab>
                            :
                            <Fab variant="extended" type='submit' color="success" aria-label="add"
                                sx={{ mt: 3 }} onClick={handleUpdate} disabled={freeze}>
                                Update
                            </Fab>
                    }
                </div>
                {
                    message.length > 0 &&
                    <TimedModal time={2000} modalTitle='Info' modalMessage={message} />
                }
            </form>
        </div>
    );
}