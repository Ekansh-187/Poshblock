import { createError } from "../utils/createError.js";
import Contract from "../models/contract.model.js";
import dotenv from "dotenv";
import braintree from "braintree";
import Admin from "../models/admin.model.js";
import moment from "moment";

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

export const paymentController = async (req, res, next) => {
  try {
    const { type, nonce, cid, date } = req.body;

    let newTransaction = gateway.transaction.sale(
      {
        amount: 10,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          // var formatted = moment(state.createdAt).format("DD-MM-YYYY");
          const newReq = new Admin({ request: cid, date: date });
          await newReq.save();
          console.log(req.params.id);
          await Contract.findByIdAndUpdate(
            req.params.id,

            {
              $set: {
                uploaded: true,
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

export const upload = async (req, res, next) => {
  try {
    const { cid, date } = req.body;
    const request = new Admin({ request: cid, date: date });
    await request.save();
    await Contract.findByIdAndUpdate(
      cid,

      {
        $set: {
          uploaded: true,
        },
      }
    );
    res.status(200).send(request);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  const contract = new Contract({ ...req.body, creatorId: req.userId });
  try {
    const saved = await contract.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

export const getContract = async (req, res, next) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (req.userId !== contract.creatorId && req.userId !== contract.receiverId)
      return next(createError(403, "You are not allowed to access this page"));
    res.status(200).send(contract);
  } catch (error) {
    next(error);
  }
};

export const getContracts = async (req, res, next) => {
  try {
    const contracts = await Contract.find({
      $or: [{ creatorId: req.userId }, { receiverId: req.userId }],
    });
    res.status(200).send(contracts);
  } catch (error) {
    next(error);
  }
};

export const deleteContract = async (req, res, next) => {
  try {
    const con = await Contract.findById(req.params.id);
    if (con.creatorId !== req.userId)
      return next(
        createError(403, "You can only delete contracts created by you!")
      );
    await Contract.findByIdAndDelete(req.params.id);
    res.status(200).send("Contract widthdrawal successful");
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  console.log(req.body);
  try {
    await Contract.findByIdAndUpdate(
      req.params.id,

      {
        $set: {
          status: req.body.status,
        },
      }
    );

    res.status(200).send("Updated");
  } catch (error) {
    next(error);
  }
};
