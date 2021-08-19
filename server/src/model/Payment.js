// import mongoose module for schema modeling
import mongoose from 'mongoose';

// payment receipt schema for user payment uploads in the application
const PaymentSchema = new mongoose.Schema({
  // unique id of payment receipt
  id: {
    type: String,
    required: true,
  },
  // id of order set being referred by the report
  orderSetId: {
    type: String,
    required: true,
  },
  // title of payment receipt
  title: {
    type: String,
    required: true,
  },
  // user who uploaded the payment receipt
  user: {
    type: String,
    required: true,
  },
  // description of the payment receipt
  description: {
    type: String,
    required: false,
    default: null,
  },
  // filename of the uploaded payment receipt
  filename: {
    type: String,
    required: false,
    default: null,
  },
  // file path of the uploaded payment receipt
  filePath: {
    type: String,
    required: false,
    default: null,
  },
  // date when the payment receipt was uploaded
  dateUploaded: {
    type: String,
    required: true,
  },
});

// implement payment schema as payment model
const PaymentModel = mongoose.model('Payment', PaymentSchema);

// export payment model for data creation and manipulation
export default PaymentModel;
