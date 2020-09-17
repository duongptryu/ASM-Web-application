const Staff = require("../models/staff");
const Trainer = require("../models/trainer");

exports.getAccountStaff = async (req, res) => {
  let matchID = {}
  if (req.query.id) {
    matchID._id = req.query.id
  }
    try {
      const staffs = await Staff.find(matchID);
      if (!staffs) {
        return res.status(400).send("No staff account were found");
      }
      return res.status(200).send(staffs);
    } catch (error) {
      return res.status(500).send(error.message);
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
    const trainer = new Trainer({ ...req.body, role: "trainer" });
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






exports.getTrainer = async (req, res) => {
  let match = {};
  const listSearch = [
    "id",
    "username",
    "name",
    "type",
    "address",
    "workingPlace",
    "telephone"
  ];
  const listReq = Object.keys(req.query);
  const check = listReq.every((element) => {
    return listSearch.includes(element);
  });
  if (!check) {
    return res.status(400).send({ error: "invalid search" });
  }

  listReq.forEach((element) => {
    if (element === "id") {
      match._id = req.query.id;
      return;
    }
    match[element] = req.query[element];
  });
  try {
    const trainers = await Trainer.find(match);
    if (trainers.length == 0) {
      return res.status(400).send("No trainer account were found");
    }
    return res.status(200).send(trainers);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.createAccountTrainer = async (req, res) => {
  const listAllow = [
    "username",
    "name",
    "type",
    "address",
    "workingPlace",
    "telephone"
  ];
  const listReq = Object.keys(req.body);
  const check = listAllow.every((element) => {
    return listReq.includes(element);
  });

  if (!check) {
    return res.status(400).send({ error: "Invalid input" });
  }

  try {
    const trainer = new Trainer({ ...req.body, role: "trainee", topics:[]});
    await trainer.save();
    const token = await trainer.generateAuthorToken();
    res.status(201).send({ user: trainer, token: token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateAccountTrainer = async (req, res) => {
  const listAllow = [
    "username",
    "name",
    "type",
    "address",
    "workingPlace",
    "telephone"
  ];
  const listReq = Object.keys(req.body);
  const check = listReq.every((element) => {
    return listAllow.includes(element);
  });

  if (!check) {
    return res.status(400).send({ error: "Invalid input" });
  }

  const id = req.params.id;

  try {
    const trainer = await Trainer.findOne({ _id: id });
    listReq.forEach((element) => {
      trainer[element] = req.body[element];
    });
    await trainer.save();
    res.status(200).send({ message: "Update successful", trainer: trainer });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteAccountTrainer = async (req, res) => {
  const id = req.params.id;

  try {
    const trainer = Trainer.findOne({ _id: id });
    if (!trainer) {
      return res.status(204).send("Trainee is not exist");
    }
    await trainer.remove();
    res.status(200).send({ message: "delete successful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};



exports.login = async (req, res) => {
  const user = await Admin.findAndCheck(req.body.email, req.body.password)
  const token = await user.generateAuthorToken();
  
}


