import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    }, 
    rollNo: {
      type: String,
      required: [false, "Roll number is required"],
      unique: true,
      trim: true,
    },
    class: {
      type: String,
      required: [true, "Class is required"],
      trim: true,
    },
    section: {
        type: String,
        required: [true, "Section is required"],
        trim: true,
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    school: {
      type: String,
      ref: "School",
      required: false, // optional — if you later link it to a school collection
    },
    imageUrl: {
      type: String,       // <-- New field for student image URL
      required: false,    // optional
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Optional index to speed up search by fullName + class
studentSchema.index({ fullName: 1, class: 1 });

const Student = mongoose.model("Student", studentSchema);
export default Student;