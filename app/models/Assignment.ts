import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    status: { type: String, default: "pending" },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
  },
  { timestamps: true }
);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", AssignmentSchema);