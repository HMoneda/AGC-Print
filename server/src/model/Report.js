// import mongoose module for schema modeling
import mongoose from 'mongoose';

// report schema for user reports in the application
const ReportSchema = new mongoose.Schema({
  // unique id of report
  id: {
    type: String,
    required: true,
  },
  // id of order set being referred by the report
  orderSetId: {
    type: String,
    required: true,
  },
  // type of report
  type: {
    type: String,
    required: true,
  },
  // user who made the report
  user: {
    type: String,
    required: true,
  },
  // description (text content) of the report
  description: {
    type: String,
    required: false,
    default: null,
  },
  // filename of the report's image
  filename: {
    type: String,
    required: false,
    default: null,
  },
  // file path of the report's image
  filePath: {
    type: String,
    required: false,
    default: null,
  },
  // status of report (Resolved or Not Yet Resolved)
  status: {
    type: String,
    required: true,
    default: 'Not Yet Resolved',
  },
  // date when the report was created
  dateRequested: {
    type: String,
    required: true,
  },
});

// implement report schema as report model
const ReportModel = mongoose.model('Report', ReportSchema);

// export report model for data creation and manipulation
export default ReportModel;
