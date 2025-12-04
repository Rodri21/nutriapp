import { Schema, model, models } from 'mongoose';

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  gender: {
    type: String,
    required: true,
    enum: ['M', 'F'],
  }
}, {
  timestamps: true,
});

// const MacroDistributionSchema = new Schema({
//   protein: {
//     type: Number,
//     required: true,
//   },
//   carbs: {
//     type: Number,
//     required: true,
//   },
//   fats: {
//     type: Number,
//     required: true,
//   },
// }, { _id: false });

// const NutritionalGoalsSchema = new Schema({
//   totalCalories: {
//     type: Number,
//     required: true,
//   },
//   macroDistribution: {
//     type: MacroDistributionSchema,
//     required: true,
//   },
// }, { _id: false });

// const PatientSchema = new Schema({
//   nutriologistId: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Nutriologist',
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   gender: {
//     type: String,
//     required: true,
//     enum: ['Masculino', 'Femenino', 'Otro'],
//   },
//   nutritionalGoals: {
//     type: NutritionalGoalsSchema,
//     required: true,
//   },
//   restrictions: [{
//     type: String,
//     trim: true,
//   }],
// }, {
//   timestamps: true,
// });

export default models.Patient || model('Patient', PatientSchema);