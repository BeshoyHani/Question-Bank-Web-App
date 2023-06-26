import { useEffect, useState } from "react";
import ExamItem from "./ExamItem";
import { assignExam, getExams } from "./ExamAPI";
import StudentList from "./StudentsList";
import TimedModal from "../common/TimedModal";

export default function ExamList({ role }) {

    const [examList, setExamList] = useState([]);
    const [examID, setExamID] = useState();
    const [openStdList, setStdListStatus] = useState(false);
    const [error, setError] = useState({ type: 'Error', message: '' });

    useEffect(() => {
        async function fetchExams() {
            try {
                const exams = await getExams(role);
                return exams;
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchExams()
            .then(exams => setExamList(exams || []))
            .catch(error => console.log(error));
    }, []);

    const setErrorMessage = (type, msg) => {
        setError({
            type: type,
            message: msg
        });
        setTimeout(() => setError(type, ''), 2000);
    }

    const openStudentList = (examID) => {
        setExamID(examID);
        setStdListStatus(true);
    }

    const closeStudentList = () => {
        setStdListStatus(false);
    }

    const handleAssignExam = async (stdIDs, examDate) => {
        try {
            if (stdIDs.length === 0) {
                setErrorMessage('Error', "Please select at least one student");
                return;
            } else if (examDate === null) {
                setErrorMessage('Error', "Please Select Exam Date");
                return;
            }
            else if (new Date(examDate) - new Date() <= 0) {
                setErrorMessage('Error', "Exam Date is Over, Please Select a Valid Date");
                return;
            }
            const result = await assignExam(examID, examDate, stdIDs);
            setErrorMessage('Info', result);
        } catch (error) {
            setErrorMessage('Error', error.message);
        }
    }

    return (
        <div className="exam-list">
            {
                examList.length > 0 ?
                examList.map((exam, index) => <ExamItem key={index} exam={exam} openStudentList={openStudentList} role={role} />)
            :
            <div className="empty-list-dev">
                You don't have any exams yet!
            </div>
            }
            <StudentList open={openStdList} closeStudentList={closeStudentList} assignExam={handleAssignExam} />
            {
                error.message &&
                <TimedModal time={3000} modalTitle={error.type} modalMessage={error.message} />
            }
        </div>
    );
}