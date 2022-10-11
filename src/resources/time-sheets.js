const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

export const createNewTimeSheet = (req, res) => {
  const newTimeSheet = {
    id: parseInt(new Date().getTime().toString().substring(10), 10),
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  const sheetsList = [...timeSheets, newTimeSheet];
  fs.writeFileSync('./src/data/time-sheets.json', JSON.stringify(sheetsList));
  res.status(200).json({
    data: sheetsList,
  });
};

export const editTimeSheet = (req, res) => {
  const searchId = parseInt(req.params.id, 10);
  let searchIndex;
  const sheetsList = timeSheets;
  for (let i = 0; i < sheetsList.length; i += 1) {
    if (sheetsList[i].id === searchId) {
      searchIndex = i;
    }
  }
  if (req.body.name) {
    sheetsList[searchIndex].name = req.body.name;
  }
  if (req.body.description) {
    sheetsList[searchIndex].description = req.body.description;
  }
  if (req.body.startDate) {
    sheetsList[searchIndex].startDate = req.body.startDate;
  }
  if (req.body.endDate) {
    sheetsList[searchIndex].endDate = req.body.endDate;
  }
  fs.writeFileSync('./src/data/time-sheets.json', JSON.stringify(sheetsList));
  res.status(200).json({
    sheetsList,
  });
};
