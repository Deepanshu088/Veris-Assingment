// const cron = require('node-cron');
// const User = require('../models/userSchema');
// const Attendence = require('../models/attendenceSchema');

// // Every Mid-Night Except Saturdays and Sundays
// const dailyAttendenceCron = () => {
//     cron.schedule('0 0 * * 1-5', createStudentsAttendences);
// }

// const createStudentsAttendences = async () => {
//     console.log("triigerred daily Attendence Cron")
//     // try {
//     //     const students = await User.findAll({userRole: "student"}, {password: 0});

//     //     console.log("Total No of students", students.length); // todo : use a professional logger.
//     //     let date = new Date.now();
//     //     date.setDate(date.getDate() + 1);

//     //     const studentAttendenceList = students.map(student => {
//     //         return {
//     //             date,
//     //             studentId: student._id,
//     //             attendedSubjects: []
//     //         }
//     //     })

//     //     const result = await Attendence.insertMany(studentAttendenceList);
//     //     console.log("Results after popuplating Attendence: ", result); // todo : use a professional logger.
//     // } catch (e) {
//     //     console.log(e);
//     // }

// }

// export default dailyAttendenceCron;