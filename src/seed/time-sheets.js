import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('635321207ca59575d18db35b'),
  description: 'Example for testing with jest in timesheet',
  date: '2022-05-15',
  hours: 18,
  task: mongoose.Types.ObjectId('635321f4e4e54b3f10b47f9e'),
  employee: mongoose.Types.ObjectId('635322714bb3e214c098deaf'),
  projects: mongoose.Types.ObjectId('63532304206881f4ae0b709b'),
},
{
  _id: mongoose.Types.ObjectId('63532598456a79a9b1c34790'),
  description: 'Example for testing with jest in timesheet',
  date: '2022-05-15',
  hours: 15,
  task: mongoose.Types.ObjectId('635325a5c39a0040ecf7a860'),
  employee: mongoose.Types.ObjectId('635325adc90228d7485c0e1f'),
  projects: mongoose.Types.ObjectId('63532304206881f4ae0b709b'),
}];
