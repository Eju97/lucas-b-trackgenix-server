const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

export const createNewTimeSheet = (req, res) => {
  const newTimeSheet = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  const sheetsList = [...timeSheets, { ...newTimeSheet }];
  fs.writeFileSync('./src/data/time-sheets.json', JSON.stringify(sheetsList));
  res.status(200).json({
    data: sheetsList,
  });
};

export const editTimeSheet = (req, res) => {
  const searchId = parseInt(req.params.id, 10);
  let Index;
  const sheetsList = timeSheets;
  for (let i = 0; i < sheetsList.length; i += 1) {
    if (sheetsList[i].id === searchId) {
      Index = i;
    }
  }
  if (req.body.name) {
    sheetsList[Index].name = req.body.name;
  }
  if (req.body.description) {
    sheetsList[Index].description = req.body.description;
  }
  if (req.body.startDate) {
    sheetsList[Index].startDate = req.body.startDate;
  }
  if (req.body.endDate) {
    sheetsList[Index].endDate = req.body.endDate;
  }
  const editedSheets = [...sheetsList];
  fs.writeFileSync('./src/data/time-sheets.json', JSON.stringify(editedSheets));
  res.status(200).json({
    editedSheets,
  });
};
