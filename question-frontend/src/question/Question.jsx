import './Question.css';
import InputField from '../common/InputField';
import AnswerList from '../answer/AnswerList';
import { useState } from 'react';
import { Fab } from '@mui/material';
import { createQuestion } from './QuestionAPI';

export default function Question() {
    const [answers, setAnswers] = useState([{
        id: 1,
        name: '',
        description: ''
    }]);
    const [question, setQuestion] = useState({
        name: '',
        mark: 0,
        category: '',
        subCategory: '',
        expectedTime: '',
        correctAnswers: []
    });

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

    const addAnswer = () => {
        const answer = {
            ansID: '',
            ansName: '',
            ansDescription: ''
        };
        setAnswers([...answers, answer]);
    }

    const handleQuestionChange = (event) => {
        const { name, value } = event.target;
        setQuestion({ ...question, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, category, subcategory, mark, expectedTime } = question;
        try {
            for (const prop in question) {
                if (question[prop].length === 0) {
                    throw new Error('All Fields are Required.');
                }
            }
            const correctAnswers = question.correctAnswers.split(',');
            await createQuestion(name, category, subcategory, mark, expectedTime, answers, correctAnswers);
        } catch (error) {
            event.preventDefault();
            console.log(error.message)
        }
    }
    return (
        <div className='container'>
            <form>
                <div className='d-flex'>
                    <InputField id="qName" type="text" name="name" label="Question Name" placeholder="Question Name"
                        value={question.qName} onChange={handleQuestionChange} />
                    <InputField id="qMark" type="text" name="mark" label="Mark" placeholder="0"
                        value={question.qMark} onChange={handleQuestionChange} />

                </div>

                <div className='d-flex'>
                    <InputField id="qCategory" type="text" name="category" label="Category" placeholder="Multiple Choice"
                        value={question.qCategory} onChange={handleQuestionChange} />
                    <InputField id="qSubCategory" type="text" name="subCategory" label="Sub Category" placeholder="HPC"
                        value={question.qSubCategory} onChange={handleQuestionChange} />

                </div>

                <div className='d-flex'>
                    <InputField id="qExpectedTime" type="text" name="expectedTime" label="Expected Time" placeholder="Time in Seconds"
                        value={question.qExpectedTime} onChange={handleQuestionChange}
                    />
                    <InputField id="qCorrectAnswers" type="text" name="correctAnswers" label="Correct Answers" placeholder="1, 3, 5"
                        value={question.qCorrectAnswers} onChange={handleQuestionChange} />

                </div>

                <hr />
                <AnswerList answers={answers} onAddAnswer={addAnswer} handleAnswerChange={handleAnswerChange} />

                <div className='d-flex'>
                    <Fab variant="extended" type='submit' color="success" aria-label="add" sx={{ mt: 3 }} onClick={handleSubmit}>
                        Create
                    </Fab>
                </div>
            </form>
        </div>
    );
}