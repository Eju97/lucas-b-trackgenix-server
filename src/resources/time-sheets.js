const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const compareDates = (firstDate, secondDate, queryDate) => {
  const date1 = new Date(firstDate).getTime();
  const date2 = new Date(secondDate).getTime();
  const date3 = new Date(queryDate).getTime();
  return (date1 <= date3 && date3 <= date2);
};

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

export const getTimeById = (req, res) => {
  const timeId = parseInt(req.params.id, 10);
  const foundTime = timeSheets.find((time) => time.id === timeId);
  return foundTime
    ? res.status(200).json({
      data: foundTime,
    })
    : res.status(404).json({
      message: `The ID: ${timeId} doesn't exist`,
    });
};

export const deleteTimeById = (req, res) => {
  const timeId = parseInt(req.params.id, 10);
  const foundTime = timeSheets.find((time) => time.id === timeId);
  const newTimeList = timeSheets.filter((time) => timeId !== time.id);
  return foundTime
    ? fs.writeFile('src/data/time-sheets.json', JSON.stringify(newTimeList, null, 2), (err) => {
      if (err) {
        res.status(500).json({
          message: 'Cannot edit the file',
        });
      } else {
        res.status(200).json({
          message: 'Time deleted',
        });
      }
    })
    : res.status(404).json({
      message: `Error 404, the ID: ${timeId} doesn't exist`,
    });
};

export const getFilteredList = (req, res) => {
  const nameFilter = req.query.name;
  const descriptionFilter = req.query.description;
  const dateFilter = req.query.date;
  let filteredList = timeSheets;
  if (nameFilter) {
    filteredList = filteredList.filter((time) => time.name.includes(nameFilter));
  }
  if (descriptionFilter) {
    filteredList = filteredList.filter((time) => time.description.includes(descriptionFilter));
  }
  if (dateFilter) {
    filteredList = filteredList.filter((time) => compareDates(
      time.startDate,
      time.endDate,
      dateFilter,
    ));
  }
  return filteredList.length !== 0
    ? res.status(200).json({
      data: filteredList,
    })
    : res.status(404).json({
      message: 'Error 404, doesnt exists any object with that query params',
    });
};
