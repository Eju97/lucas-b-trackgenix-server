import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('6352dae0282ae0599b7acd92'),
  name: 'Coca Cola Webpage',
  clientName: 'Coca Cola',
  description: 'New web page for coca cola',
  startDate: '2022-03-22T03:00:00.000Z',
  endDate: '2022-03-25T03:00:00.000Z',
  employees: [
    {
      employee: mongoose.Types.ObjectId('634c68f3658f142935ea7f6e'),
      rate: 20,
      role: 'DEV',
    },
  ],
},
];
