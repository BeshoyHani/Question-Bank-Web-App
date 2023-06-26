import { useEffect, useState } from "react";
import InputField from "../common/InputField";
import { getAllQuestions } from "../question/QuestionAPI";
import QuestionListItem from "./QuestionListItem";
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createExam } from "./ExamAPI";
import TimedModal from '../common/TimedModal';

const examObj = {
    name: '',
    passing_score: 50,
    duration: 1
};

export default function CreateExam() {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState({ type: 'Error', message: '' });
    const [submitBtnStatus, setSubmitBtnStatus] = useState(false);
    const [examInfo, setExamInfo] = useState(examObj);

    const setErrorMessage = (type, msg) => {
        setError({
            type: type,
            message: msg
        });
        setTimeout(() => setError(type, ''), 2000);
    }

    useEffect(() => {
        findQuestions(1)
            .then(questions => setQuestions(questions || []))
            .catch(error => setErrorMessage('Error', error.message));
    }, []);

    const handleSelectQuestion = (q) => {
        const _questions = questions.map(item => {
            return item._id === q._id ?
                {
                    ...item,
                    isChecked: !!!item.isChecked
                } :
                item;
        });
        setQuestions(_questions);
    }

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        const info = {
            ...examInfo,
            [name]: value
        };
        setExamInfo(info);
    }

    const findQuestions = async (pageNo) => {
        try {
            const questions = await getAllQuestions(pageNo);
            return questions;
        } catch (error) {
            setErrorMessage('Error', error.message);
        }
    }

    const handleSubmit = async () => {
        const qIDs = questions
            .filter(q => q.isChecked === true)
            .map(q => q._id);

        for (const prop in examInfo) {
            if (examInfo[prop].length === 0) {
                setErrorMessage('Error', 'All Fields are Required.');
                return;
            }
        }

        if (qIDs.length === 0) {
            setErrorMessage('Error', 'Must choose at least one question.');
            return;
        }

        const obj = {
            ...examInfo,
            questions: qIDs
        }
        try {
            setSubmitBtnStatus(true);
            const response = await createExam(obj);
            setSubmitBtnStatus(false);
            setErrorMessage('Info', response);
            resetInput();
        } catch (error) {
            setErrorMessage('Error', error.message);
            setSubmitBtnStatus(false);
        }
    }

    const resetInput = () => {
        setExamInfo(examObj);
        setQuestions(questions.map(q => {
            return {
                ...q,
                isChecked: false
            }
        }));
    }

    return (
        <div className="exam-container">
        <h1>Create Exam</h1>
            <InputField className='row' id="name" type="text" name="name" label="Name" placeholder="Name"
                value={examInfo.name} onChange={handleChangeInput} />

            <InputField className='row' id="passing_score" type="number" name="passing_score" label="Passing Score" placeholder="Passing Score"
                value={examInfo.passing_score} onChange={handleChangeInput} />

            <InputField className='row' id="duration" type="number" name="duration" label="Duration (hours)" placeholder="Duration "
                value={examInfo.duration} onChange={handleChangeInput} />

            <label> <strong>Questions</strong></label>
            <ol className="exam-item-row">
                {
                    questions.map((question, index) => {
                        return <QuestionListItem key={index} onCheck={handleSelectQuestion} question={question} index={index} />
                    })
                }

            </ol>

            <Fab color="success" aria-label="Create" onClick={handleSubmit} disabled={submitBtnStatus}>
                <AddIcon />
            </Fab>

            {
                error.message &&
                <TimedModal time={3000} modalTitle={error.type} modalMessage={error.message} />
            }
        </div>

    );
}