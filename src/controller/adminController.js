const Staff = require("../models/staff");
const Trainer = require("../models/trainer");

exports.getAccountStaff = async (req, res) => {
  if (req.query.id) {
    try {
      const id = req.query.id;
      const staff = await Staff.findOne({ _id: id });
      if (!staff) {
        return res.status(400).send("ID user don't exist");
      }
      return res.status(200).send(staff);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    try {
      const staffs = await Staff.find();
      if (!staffs) {
        return res.status(400).send("No staff account were found");
      }
      return res.status(200).send(staffs);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};

exports.getAccountTrainer = async (req, res) => {
  if (req.query.id) {
    try {
      const id = req.query.id;
      const trainer = await Trainer.findOne({ _id: id });
      if (!trainer) {
        return res.status(400).send("ID user don't exist");
      }
      return res.status(200).send(trainer);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    try {
      const trainers = await Trainer.find();
      if (!trainers) {
        return res.status(400).send("No trainer account were found");
      }
      return res.status(200).send(trainers);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};

exports.createAccountStaff = async (req, res) => {
  const listAllow = ["username", "password"];
  const listReq = Object.keys(req.body);
  const check = listReq.every((obj) => {
    return listAllow.includes(obj);
  });

  if (!check) {
    return res.status(400).send("Error, invalid input");
  }

  try {
    const staff = new Staff({ ...req.body, role: "staff" });
    await staff.save();
    const token = await staff.generateAuthorToken();
    res.status(201).send({
      user: staff,
      token: token,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.createAccountTrainer = async (req, res) => {
  const listAllow = [
    "username",
    "password",
    "name",
    "type",
    "address",
    "workingPlace",
    "telephone",
  ];
  const listReq = Object.keys(req.body);
  const check = listReq.every((obj) => {
    return listAllow.includes(obj);
  });

  if (!check) {
    return res.status(400).send("Error, invalid input");
  }

  try {
    const trainer = new Trainer({ ...req.body, role: "staff" });
    await trainer.save();
    const token = await trainer.generateAuthorToken();
    res.status(201).send({
      user: trainer,
      token: token,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateAccountTrainer = async (req, res) => {
  const listAllow = [
    "username",
    "password",
    "name",
    "type",
    "address",
    "workingPlace",
    "telephone",
  ];
  const listReq = Object.keys(req.body);
  const check = listReq.every((obj) => {
    return listAllow.includes(obj);
  });

  if (!check) {
    return res.status(400).send("Error, invalid input");
  }

  const id = req.params.id;
  try {
    const trainer = await Trainer.findOne({ _id: id });
    if (!trainer) {
      return res.status(204).send("Trainer is not exist");
    }
    listReq.forEach((element) => {
      trainer[element] = req.body[element];
    });
    await trainer.save();
    res.status(200).send(trainer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateAccountStaff = async (req, res) => {
  const listAllow = ["username", "password"];
  const listReq = Object.keys(req.body);
  const check = listReq.every((obj) => {
    return listAllow.includes(obj);
  });

  if (!check) {
    return res.status(400).send("Error, invalid input");
  }

  const id = req.params.id;
  try {
    const staff = await Staff.findOne({ _id: id });
    if (!staff) {
      return res.status(204).send("Staff is not exist");
    }

    listReq.forEach((element) => {
      staff[element] = req.body[element];
    });
    await staff.save();
    res.status(200).send(staff);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.deleteAccountTrainer = async () => {
    const id = req.params.id;
    try {
        const trainer = Trainer.findOne({_id: id})
        if(!trainer){
            return res.status(400).send("Trainer is not exist")
        }
        trainer.remove();
        res.status(200).send("Remove trainer account successful")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.deleteAccountTrainer = async (req, res) => {
    const id = req.params.id;
    try {
        const trainer = await Trainer.findOne({_id: id})
        if(!trainer){
            return res.status(400).send("Trainer is not exist")
        }
        trainer.remove();
        res.status(200).send({message: "delete account successful", trainer: trainer})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.deleteAccountStaff = async (req, res) => {
    const id = req.params.id;
    try {
        const staff = await Staff.findOne({_id: id})
        if(!staff){
            return res.status(400).send("Staff is not exist")
        }
        staff.remove();
        res.status(200).send({message: "delete account successful", staff: staff})
    } catch (error) {
        res.status(500).send(error.message)
    }
}