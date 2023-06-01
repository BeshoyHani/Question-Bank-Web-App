import { useEffect, useState } from "react";
import ExamItem from "./ExamItem";
import { assignExam, getExams } from "./ExamAPI";
import StudentList from "./StudentsList";

export default function ExamList({role}) {

    const [examList, setExamList] = useState([]);
    const [examID, setExamID] = useState();
    const [openStdList, setStdListStatus] = useState(false);

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

    const openStudentList = (examID) => {
        setExamID(examID);
        setStdListStatus(true);
    }

    const closeStudentList = () => {
        setStdListStatus(false);
    }

    const handleAssignExam = async (stdIDs, examDate) => {
        try {
            const result = await assignExam(examID, examDate, stdIDs);
            console.log(result);
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="exam-list">
            {
                examList.map((exam, index) => <ExamItem key={index} exam={exam} openStudentList={openStudentList} role={role}  />)
            }
            <StudentList open={openStdList} closeStudentList={closeStudentList} assignExam={handleAssignExam} />
        </div>
    );
}