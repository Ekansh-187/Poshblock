import Admin from "../models/admin.model.js";
export const getAll = async (req, res, next) => {
  try {
    const requests = await Admin.find();
    res.status(200).send(requests);
  } catch (error) {}
};

export const getPending = async (req, res, next) => {
  try {
    const requests = await Admin.find({ uploaded: false });
    res.status(200).send(requests);
  } catch (error) {}
};

export const requestUpload = async (req, res, next) => {
  try {
    const upload = new Admin(req.body);
    res.status(200).send("Works fine");
  } catch (error) {
    next(error);
  }
};

export const setUploaded = async (req, res, next) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    await Admin.findOneAndUpdate(
      { request: id },
      {
        $set: {
          uploaded: true,
        },
      }
    );
    res.status(200).send("Uploaded");
  } catch (error) {
    next(error);
  }
};
