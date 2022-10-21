import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('635321207ca59575d18db35b'),
  description: 'Example for testing with jest in timesheet',
  date: '2022-05-15',
  hours: 18,
  task: {
    _id: mongoose.Types.ObjectId('635321f4e4e54b3f10b47f9e'),
    description: 'Duis aute irure dolor in reprehenderit in voluptate',
  },
  employee: {
    _id: mongoose.Types.ObjectId('635322714bb3e214c098deaf'),
    first_name: 'Roberto',
    last_name: 'Carlos',
    email: 'robertocarlos3@gmail.com',
    phone: 3416000973,
    password: '128kalnWksI5As',
  },
  projects: {
    _id: mongoose.Types.ObjectId('63532304206881f4ae0b709b'),
    name: 'Project 1',
    clientName: 'Mac Donald',
    description: 'Project number 1 for testing',
    startDate: '2022-10-20',
    endDate: '2022-10-21',
    employees: [{
      rate: 50,
      role: 'QA',
    }],
  },
},
{
  _id: mongoose.Types.ObjectId('63532598456a79a9b1c34790'),
  description: 'Example for testing with jest in timesheet',
  date: '2022-05-15',
  hours: 15,
  task: {
    _id: mongoose.Types.ObjectId('635325a5c39a0040ecf7a860'),
    description: 'Culpa qui officia deserunt mollit anim id est laborum.',
  },
  employee: {
    _id: mongoose.Types.ObjectId('635325adc90228d7485c0e1f'),
    first_name: 'Rolando',
    last_name: 'Nazario',
    email: 'ronaldo9@gmail.com',
    phone: 3416150750,
    password: 's1sdcD7hk129',
  },
  projects: {
    _id: mongoose.Types.ObjectId('63532304206881f4ae0b709b'),
    name: 'Project 1',
    clientName: 'Mac Donald',
    description: 'Project number 2 for testing',
    startDate: '2022-10-20',
    endDate: '2022-10-21',
    employees: [{
      rate: 40,
      role: 'DEV',
    }],
  },
}];
