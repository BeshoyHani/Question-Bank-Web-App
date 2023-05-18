import { useEffect, useRef, useState } from "react";
import { deleteQuestion, getAllQuestions } from "./QuestionAPI";
import QuestionItem from "./QuestionItem";

export default function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const flagRef = useRef(0);

    useEffect(() => {
        const findQuestions = async () => {
            try {
                const questions = await getAllQuestions();
                return questions;
            } catch (error) {
                console.log(error.message);
            }
        }
        if(flagRef.current < 2 ){
            findQuestions()
                .then(questions => setQuestions(questions || []))
                .catch(error => console.log(error.message));
            flagRef.current++;
        }
    }, []);

    const onDeleteQuestion = async (id) => {
        try {
            console.log('hh')
            await deleteQuestion(id);
            setQuestions(questions.map(question => question._id !== id));
        } catch (error) {
        }
    }

    return (
        <div>
            {
                questions.map((question, index) => {
                    return <QuestionItem key={index} name={question.name} onDelete={() => onDeleteQuestion(question._id)} />
                })
            }
        </div>
    );
}