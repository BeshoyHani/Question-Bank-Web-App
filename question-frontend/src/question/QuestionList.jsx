import { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions, getQuestionCount } from "./QuestionAPI";
import QuestionItem from "./QuestionItem";
import { Pagination } from "@mui/material";
import TimedModal from "../common/TimedModal";

export default function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [numOfPages, setNumOfPages] = useState(0);
    const [error, setError] = useState('');

    const setErrorMessage = (msg) => {
        setError(msg);
        setTimeout(() => setError(''), 1000);
    }

    useEffect(() => {
        findQuestions(pageNo)
            .then(questions => setQuestions(questions || []))
            .catch(error => setErrorMessage(error.message));
    }, [pageNo]);

    useEffect(() => {
        getQuestionCount()
            .then(data => {
                const { count, questionsPerPage } = data;
                const pages = Math.max(1, count / questionsPerPage);
                setNumOfPages(pages);
            })
            .catch(error => setErrorMessage(error.message));
    }, []);


    const findQuestions = async (pageNo) => {
        try {
            const questions = await getAllQuestions(pageNo);
            return questions;
        } catch (error) {
            setErrorMessage(error.message);
        }
    }


    const handleChange = async (event, value) => {
        const questionsList = await findQuestions(value);
        setQuestions(questionsList);
        setPageNo(value);
    }

    const onDeleteQuestion = async (id) => {
        try {
            await deleteQuestion(id);
            const questionsList = await findQuestions(pageNo);
            setQuestions(questionsList);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <div className="question-list-container">
            <h2 id='list-title'>Questions</h2>
            <ol>
                {
                    questions.map((question, index) => {
                        return (
                            <QuestionItem
                                key={index}
                                name={question.name}
                                category={question.category}
                                eTime={question.expectedTime}
                                questionID={question._id}
                                onDelete={() => onDeleteQuestion(question._id)} />
                        )

                    })
                }
            </ol>

            {error.length > 0 &&
                <TimedModal time={2000} modalTitle='Error' modalMessage={error} />
            }
            <div className="bottom-pagination-container">
                <Pagination count={numOfPages} page={pageNo} onChange={handleChange} />
            </div>
        </div>
    );
}