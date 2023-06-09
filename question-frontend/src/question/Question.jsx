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
    description: '',
    isCorrect: false
}

export default function Question({ isCreate }) {
    const [qID, setQID] = useState(useParams().id);
    const [answers, setAnswers] = useState([answerObj, { ...answerObj, id: 2 }]);
    const [question, setQuestion] = useState(questionObj);
    const [message, setMessage] = useState('');
    const [freeze, setFreze] = useState(false);

    const handleAnswerChange = (event, index) => {
        let { name, value } = event.target;
        value = name === 'isCorrect' ? event.target.checked : value;

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
        setTimeout(() => setMessage(''), 2000);
    }

    const addAnswer = () => {
        const answer = {
            id: answers[answers.length - 1].id + 1,
            name: '',
            description: ''
        };
        setAnswers([...answers, answer]);
    }

    const handleQuestionChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setQuestion({ ...question, [name]: value });
    }

    const validateQuestionFields = () => {
        console.log(answers)
        const questions = {
            ...question,
            correctAnswers: answers
        };
        console.log(questions)
        for (const prop in questions) {
            if (questions[prop].length === 0) {
                throw new Error('All Fields are Required.');
            }
        }
        
        const count = answers.filter(ans => ans.isCorrect === true);
        if (count.length === 0) {
            throw new Error('At least one answer should be correct');
        }
    }

    const extractCorrectAnswers = () => {
        const correctAnswers = answers
            .filter(answer => answer.isCorrect === true)
            .map(answer => answer.id);
        return correctAnswers;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            validateQuestionFields();
            const _answers = answers.map(({ isCorrect, ...rest }) => rest);
            const obj = {
                ...question,
                correctAnswers: extractCorrectAnswers(),
                answers: _answers
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
            const _answers = answers.map(({ isCorrect, ...rest }) => rest);
            const obj = {
                ...question,
                correctAnswers: extractCorrectAnswers(),
                answers: _answers,
                id: qID
            };
            setFreze(true);
            const updatedQuestion = await updateQuestion(obj);
            setFreze(false);
            setQuestion(updatedQuestion);
            //setAnswers(updatedQuestion.answers)
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
                    const _answers = question.answers
                        .map(ans => question.correctAnswers
                            .includes(ans.id) === true ? { ...ans, isCorrect: true } : ans);
                    setAnswers(_answers);
                })
                .catch(error => console.log(error));
        } else {
            setQuestion(questionObj);
            setAnswers([answerObj, { ...answerObj, id: 2 }]);
        }
    }, [isCreate, qID]);


    return (
        <div className='container'>
            {
                question ?
                    <form>
                        <div className='d-flex' id="qName">
                            <InputField id="qName" type="text" name="name" label="Question Name" placeholder="Question Name"
                                value={question.name} onChange={handleQuestionChange} />

                        </div>

                        <div className='d-flex'>
                            <InputField id="qMark" type="number" name="mark" label="Mark" placeholder="0"
                                value={question.mark} onChange={handleQuestionChange} />
                            <InputField id="qCategory" type="text" name="category" label="Category" placeholder="Multiple Choice"
                                value={question.category} onChange={handleQuestionChange} />

                        </div>

                        <div className='d-flex'>
                            <InputField id="qSubCategory" type="text" name="subCategory" label="Sub Category" placeholder="HPC"
                                value={question.subCategory} onChange={handleQuestionChange} />
                            <InputField id="qExpectedTime" type="number" name="expectedTime" label="Expected Time" placeholder="Time in Seconds"
                                value={question.expectedTime} onChange={handleQuestionChange}
                            />

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
                            <TimedModal time={3000} modalTitle='Info' modalMessage={message} />
                        }
                    </form>
                    :
                    <p>Oops! Something goes Wrong</p>
            }
        </div>
    );
}