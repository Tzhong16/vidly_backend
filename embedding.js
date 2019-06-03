const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    author: { type: authorSchema, required: true }
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // Find and update

  // const course = await Course.findById(courseId);
  // course.author.name = 'Terence Zhong';
  // const result = await course.save();
  // console.log(result);

  //update first
  const course = await Course.update(
    { _id: courseId },
    {
      //$unset
      $set: {
        'author.name': 'John Smith'
      }
    }
  );

  console.log(course);
}
// createCourse('Node Course', new Author({ name: 'Terence' }));

updateAuthor('5cf4d76d14fc05124215af0a');
