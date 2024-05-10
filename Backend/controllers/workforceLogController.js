const Workforce = require('../models/workforce');
const WorkforceLog = require('../models/workforceLog');

exports.postAssignLogin = async (req, res) => {
  const workforce = await Workforce.findById(req.body.workforceId);
  if (!workforce) {
    return res.status(404).json({ message: 'Workforce not found' });
  }

  const newWorkforceLog = new WorkforceLog({
    workforceId: req.body.workforceId,
    loginTime: Date.now()
  });

  await newWorkforceLog.save();
  res.status(201).json(newWorkforceLog);
};
exports.getAssignLogin = async (req, res) => {
    try {
      const startOfDay = moment().startOf('day');
      const endOfDay = moment().endOf('day');
  
      const workforceLogs = await WorkforceLog.find({
        date: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }
      });
  
      const loggedWorkforceIds = workforceLogs.map(log => log.workforceId);
  
      const workforces = await Workforce.find({
        _id: { $nin: loggedWorkforceIds }
      });
  
      res.status(200).json(workforces);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };
  
  exports.postAssignLogout = async (req, res) => {
    try {
      const workforceLog = await WorkforceLog.findOne({ workforceId: req.body.workforceId, loginTime: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) } });
      if (!workforceLog) {
        return res.status(404).json({ message: 'WorkforceLog not found' });
      }
      workforceLog.logoutTime = Date.now();
  
      // Calculate total hours worked
      const millisecondsWorked = workforceLog.logoutTime - workforceLog.loginTime;
      const hoursWorked = millisecondsWorked / 1000 / 60 / 60;
      workforceLog.totalHoursWorked = hoursWorked;
  
      // Get the required work time from the Workforce model
      const workforce = await Workforce.findById(req.body.workforceId);
      const requiredWorkTimeHour = workforce.requiredWorkTimeHour;
  
      // Calculate overtime hours
      const overtimeHours = hoursWorked > requiredWorkTimeHour ? hoursWorked - requiredWorkTimeHour : 0;
      workforceLog.overtimeHours = overtimeHours;
  
      await workforceLog.save();
      res.status(200).json(workforceLog);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };
  exports.getAssignLogout = async (req, res) => {
    try {
      const startOfDay = moment().startOf('day');
      const endOfDay = moment().endOf('day');
  
      const workforceLogs = await WorkforceLog.find({
        logoutTime: null,
        date: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }
      });
  
      const workforces = workforceLogs.map(log => log.workforceId);
  
      res.status(200).json(workforces);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };
  
  exports.getPermitLeave = async (req, res) => {
    try {
      const startOfDay = moment().startOf('day');
      const endOfDay = moment().endOf('day');
  
      const workforceLogs = await WorkforceLog.find({
        date: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }
      });
  
      const loggedWorkforceIds = workforceLogs.map(log => log.workforceId);
  
      const workforces = await Workforce.find({
        _id: { $nin: loggedWorkforceIds }
      });
  
      res.status(200).json(workforces);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };
  
  exports.postPermitLeave = async (req, res) => {
    try {
      const workforceLog = new WorkforceLog({
        workforceId: req.body.workforceId,
        leave: true
      });
  
      await workforceLog.save();
      res.status(201).json(workforceLog);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };
  exports.getGenerateInfoForADay = async (req, res) => {
    try {
      const day = new Date(req.body.day);
      const startOfDay = moment(day).startOf('day');
      const endOfDay = moment(day).endOf('day');
  
      const workforceLogs = await WorkforceLog.find({
        date: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }
      });
  
      const loggedWorkforceIds = workforceLogs.map(log => log.workforceId);
  
      const allWorkforces = await Workforce.find();
      const allWorkforceIds = allWorkforces.map(workforce => workforce._id);
  
      const absentWorkforceIds = allWorkforceIds.filter(id => !loggedWorkforceIds.includes(id));
  
      const result = allWorkforces.map(workforce => {
        return {
          ...workforce._doc,
          absence: absentWorkforceIds.includes(workforce._id)
        };
      });
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };

  exports.getGenerateInfoForAMonth = async (req, res) => {
    try {
      const month = new Date(req.body.month);
      const startOfMonth = moment(month).startOf('month');
      const endOfMonth = moment(month).endOf('month');
  
      const allWorkforces = await Workforce.find();
      const result = [];
  
      for (let workforce of allWorkforces) {
        const workforceLogs = await WorkforceLog.find({
          workforceId: workforce._id,
          date: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() }
        });
  
        let leaves = 0;
        let absences = 0;
        let normalWorkingDays = 0;
        let overtimeDays = 0;
        let totalWorkingHours = 0;
  
        for (let log of workforceLogs) {
          if (log.leave) {
            leaves++;
          } else if (!log.loginTime) {
            absences++;
          } else {
            const hoursWorked = (log.logoutTime - log.loginTime) / 1000 / 60 / 60;
            totalWorkingHours += hoursWorked;
  
            if (hoursWorked > workforce.requiredWorkTimeHour) {
              overtimeDays++;
            } else {
              normalWorkingDays++;
            }
          }
        }
  
        result.push({
          workforce: workforce,
          leaves: leaves,
          absences: absences,
          normalWorkingDays: normalWorkingDays,
          overtimeDays: overtimeDays,
          totalWorkingHours: totalWorkingHours
        });
      }
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };
  