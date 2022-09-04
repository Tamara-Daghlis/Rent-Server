const product = require("../model/product");
const rentRecord = require("../model/rentRecord");

const createRentRecord = function (request, response) {
  const productId = request.params.id;
  const productInfo = product.find({ _id: productId });

  let newRentRecord = new rentRecord({
    product: productInfo,
    renter: request.user,
  });

  save(newRentRecord)
    .then((newRentRecord) => {
      response.status(201).send(newRentRecord);
    })
    .catch((error) => {
      response
        .status(404)
        .json({ message: "Coudn't create the rent record", error: error });
    });
};

const getRentRecords = function (request, response) {
  rentRecord
    .find({})
    .populate("product")
    .populate("renter")
    .then((rentRecords) => response.status(200).send(rentRecords))
    .catch((error) =>
      response
        .status(404)
        .json({ messege: "Rent records  not found", error: error })
    );
};

const getRentRecord = function (request, response) {
  const recordId = request.params.id;
  rentRecord
    .find({ _id: recordId })
    .populate("product")
    .populate("renter")
    .then((rentRecord) => response.status(200).send(rentRecord))
    .catch((error) =>
      response.status(404).json({ messege: "Record not found", error: error })
    );
};

const updateRentRecord = function (request, response) {
  const recordId = request.params.id;
  const recordInfo = request.body;
  rentRecord
    .findByIdAndUpdate(recordId, recordInfo)
    .save()
    .then((updateRecord) => {
      response.status(200).send(updateRecord);
    })
    .catch((error) => {
      response
        .status(404)
        .json({ message: "cant update the record", error: error });
    });
};

const deleteRentRecord = function (request, response) {
  const recordId = request.params.id;
  rentRecord
    .findByIdAndDelete(recordId)
    .then((deletedRecord) => {
      response.send(deletedRecord);
    })
    .catch((error) => {
      response
        .status(404)
        .json({ messege: "cant delete the record", error: error });
    });
};

module.exports = {
  createRentRecord,
  getRentRecords,
  getRentRecord,
  updateRentRecord,
  deleteRentRecord,
};
