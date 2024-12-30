
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { connectDB } = require('../config/database');

const migrateImgField = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await Product.updateMany(
      { img: { $type: 'string' } },
      [
        {
          $set: {
            img: { $cond: { if: { $isArray: '$img' }, then: '$img', else: [{ $toString: '$img' }] } }, 
          },
        },
      ],
      { session }
    );

    await session.commitTransaction();
    console.log('Migration completed successfully', result);
  } catch (err) {
    await session.abortTransaction();
    console.error('Migration failed, transaction rolled back', err);
  } finally {
    session.endSession();
  }
};

const runMigration = async () => {
  try {
    await connectDB();

    await migrateImgField();
  } catch (err) {
    console.error('Error running migration:', err);
  } finally {
    mongoose.connection.close();
  }
};

runMigration();
