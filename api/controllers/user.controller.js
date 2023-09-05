import { createError } from "../utils/createError.js";
import dotenv from "dotenv";
import braintree from "braintree";
import User from "../models/user.model.js";
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

export const tokenController = async (req, res, next) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString())
    return next(createError(403, "You can delete only your account!"));

  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted!");
};

export const getUserByName = async (req, res, next) => {
  const q = req.query;
  const filter = { username: q.uname };
  try {
    const users = await User.findOne(filter);
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getUsersByEmail = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.name && { username: { $regex: q.name, $options: "i" } }),
  };
  try {
    const users = await User.find(filters);
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUsername = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json(user.username);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {};

export const paymentController = async (req, res, next) => {
  try {
    const { type, nonce } = req.body;

    let newTransaction = gateway.transaction.sale(
      {
        amount: 100,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          // var formatted = moment(state.createdAt).format("DD-MM-YYYY");

          await User.findByIdAndUpdate(
            req.params.id,

            {
              $set: {
                sub: "p",
              },
            }
          );
          res.status(200).send(newReq);
        } else {
          res.status(500).send(error);
        }
      }
    );
    // const contract = await Gig.findById(req.params.id);
  } catch (error) {
    next(error);
  }
};
