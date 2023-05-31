import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
import { getAllUsers } from '../user/UserAPI';
import { useState } from 'react';


function DialogList({ onClose, open, students, onSelect, isDisabled, onSubmit, examDate, setExamDate }) {

  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog onClose={handleClose} open={open} sx={{ height: '70%', paddingTop: '50px' }}>
      <DialogTitle>Select Students</DialogTitle>
      <List sx={{ pt: 0, px: 2 }}>
        {
          students.map((student, index) => (
            <ListItem key={index} disableGutters secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => onSelect(student)}
                checked={student.isChecked}
              />
            }>
              <ListItemButton onClick={() => onSelect(student)} key={student.username}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={student.username} />
              </ListItemButton>
            </ListItem>
          ))
        }

        <hr />
        <label>Exam Date</label>
        <input type="datetime-local" value={examDate} onChange={(e) => setExamDate(e.target.value)} ></input>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            disabled={isDisabled}
            onClick={() => onSubmit()}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Assign" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}


export default function StudentList({ open, closeStudentList, assignExam }) {
  const [students, setStudents] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [examDate, setExamDate] = useState(null);


  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentsList = await getAllUsers('STUDENT');
        return studentsList;
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchStudents()
      .then(students => setStudents(students || []))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = async () => {
    const stdIDs = students.filter(std => std.isChecked === true).map(std => std._id);
    setDisableSubmit(true);
    try {
      await assignExam(stdIDs, examDate);
      setDisableSubmit(false);
      closeStudentList();
    } catch (error) {
      console.log(error.message);
      setDisableSubmit(false);
    }
  }

  const handleSelectStudent = (student) => {
    const _students = students.map(std => {
      return std._id === student._id ?
        {
          ...std,
          isChecked: !!!std.isChecked
        } :
        std;
    });
    setStudents(_students);
  }

  return (
    <div>
      <DialogList
        students={students}
        isDisabled={disableSubmit}
        onSubmit={handleSubmit}
        examDate={examDate}
        setExamDate={setExamDate}
        onSelect={handleSelectStudent}
        open={open}
        onClose={() => closeStudentList()}
      />
    </div>
  );
}