import './Question.css';
import InputField from '../common/InputField';
import AnswerList from '../answer/AnswerList';
import { useState } from 'react';
import { Fab } from '@mui/material';

export default function Question() {
    const [answers, setAnswers] = useState([{
        ansID: '',
        ansName: '',
        ansDescription: ''
    }]);
    const [question, setQuestion] = useState({
        qName: '',
        qMark: '',
        qCategory: '',
        qSubCategory: '',
        qExpectedTime: '',
        qCorrectAnswers: []
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

    const addAnswer = (event) => {
        const answer = {
            ansID: '',
            ansName: '',
            ansDescription: ''
        };
        setAnswers([...answers, answer]);
    }

    const handleQuestionChange = (event) => {
        console.log(question)
        const { name, value } = event.target;
        setQuestion({ ...question, [name]: value });
    }

    return (
        <div className='container'>
            <form>
                <div>
                    <InputField id="qName" type="text" name="qName" label="Question Name" placeholder="Question Name"
                        value={question.qName} onChange={handleQuestionChange} />
                    <InputField id="qMark" type="text" name="qMark" label="Mark" placeholder="0"
                        value={question.qMark} onChange={handleQuestionChange} />

                </div>

                <div>
                    <InputField id="qCategory" type="text" name="qCategory" label="Category" placeholder="Multiple Choice"
                        value={question.qCategory} onChange={handleQuestionChange} />
                    <InputField id="qSubCategory" type="text" name="qSubCategory" label="Sub Category" placeholder="HPC"
                        value={question.qSubCategory} onChange={handleQuestionChange} />

                </div>

                <div>
                    <InputField id="qExpectedTime" type="text" name="qExpectedTime" label="Expected Time" placeholder="Time in Seconds"
                        value={question.qExpectedTime} onChange={handleQuestionChange}
                    />
                    <InputField id="qCorrectAnswers" type="text" name="qCorrectAnswers" label="Correct Answers" placeholder=""
                        value={question.qCorrectAnswers} onChange={handleQuestionChange} />

                </div>

                <hr />
                <AnswerList answers={answers} onAddAnswer={addAnswer} handleAnswerChange={handleAnswerChange} />

                <div>
                    <Fab variant="extended" color="success" aria-label="add" sx={{ mt: 3 }}>
                        Create
                    </Fab>
                </div>
            </form>
        </div>
    );
}