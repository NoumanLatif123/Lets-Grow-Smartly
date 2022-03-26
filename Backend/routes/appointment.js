const router = require("express").Router();
const { Appointment } = require("../models/Appointment");

// create a new appointment in the database

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const appointment = await Appointment.create(req.body);
    // console.log("body of appointment:", appointment);
    return res.status(200).json(appointment);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
//get appointment for specific doctor with specific Id
router.post("/specificAppointments", async (req, res) => {
  try {
    console.log("req.body.userId>>>> ", req.body.userId);

    let filter = {
      doctorId: req.body.doctorId,
      status: req.body.status,
      appointmentDate: req.body.date,
    };

    if (req.body.userId !== undefined) {
      filter = {
        userId: req.body.userId,
        status: req.body.status,
        appointmentDate: req.body.date,
      };
    }
    // console.log("filter>>>>> ", filter);
    const appointments = await Appointment.find(filter);
    // console.log("appointments>>> appointment");
    return res.status(200).json(appointments);
  } catch (err) {
    res.status(500).send("something went wrong.....");
  }
});
//get appointment by appointment id
router.get("/getByAppointmentId/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
    });
    res.status(200).json(appointment);
  } catch {
    res.status(500).send("internal server error...");
  }
});
//update appointment
router.put("/updateAppointmentDetails", async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const appointmentDate = req.body.date;
  const appointmentTime = req.body.time;
  const description = req.body.description;

  try {
    const filter = { _id: id };
    const option = { title, appointmentDate, appointmentTime, description };
    console.log("update app=> ", filter);
    const appointment = await Appointment.findOneAndUpdate(filter, option);

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//get all appointment by userId

router.post("/:userId", async (req, res) => {
  try {
    // console.log(req.params);
    // console.log(req.body);
    const appointments = await Appointment.find({
      userId: req.params.userId,
      status: req.body.status,
    });
    //console.log(appointments);
    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(500).send("something went wrong.....");
  }
});

// get appointment by doctor id

router.post("/doctor/:doctorId", async (req, res) => {
  try {
    const filter = { doctorId: req.params.doctorId, status: req.body.status };
    const appointments = await Appointment.find(filter);
    return res.status(200).json(appointments);
  } catch (err) {
    res.status(500).send("something went wrong.....");
  }
});

//update status of appointment by appointment id
router.put("/update", async (req, res) => {
  try {
    const filter = { _id: req.body.appointmentId };
    let option;
    if (req.body.ratingByUser) {
      option = {
        status: req.body.status,
        ratingByUser: req.body.ratingByUser,
      };
    } else {
      option = {
        status: req.body.status,
      };
    }

    const appointment = await Appointment.findOneAndUpdate(filter, option);
    console.log("option>>>>>>,", option);
    console.log("appointment", appointment);
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const resp = await Appointment.findOneAndRemove(filter);
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
