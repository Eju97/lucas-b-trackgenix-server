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

export const getTimeById = (req, res) => {
  const timeId = parseInt(req.params.id, 10);
  const foundTime = timeSheets.find((time) => time.id === timeId);
  return foundTime
    ? res.status(200).json({
      data: foundTime,
    })
    : res.status(404).json({
      message: 'Error 404, not found',
    });
};

export const deleteTimeById = (req, res) => {
  const timeId = parseInt(req.params.id, 10);
  const foundTime = timeSheets.find((time) => time.id === timeId);
  const newTimeList = timeSheets.filter((time) => timeId !== time.id);
  return foundTime
    ? fs.writeFile('src/data/time-sheets.json', JSON.stringify(newTimeList, null, 2), (err) => {
      if (err) {
        res.send('Cannot edit the file');
      } else {
        res.status(200).json({
          message: 'Time deleted',
        });
      }
    })
    : res.status(400).json({
      message: 'Wrong ID',
    });
};
