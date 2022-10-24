import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('635321207ca59575d18db35b'),
  description: 'Example for testing with jest in timesheet',
  date: '2022-05-15',
  hours: 18,
  task: mongoose.Types.ObjectId('6352dae0282ae0599b7acd91'),
  employee: mongoose.Types.ObjectId('634c68f3658f142935ea7f6e'),
  projects: mongoose.Types.ObjectId('6352dae0282ae0599b7acd92'),
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
