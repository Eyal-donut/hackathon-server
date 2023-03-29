import Editor from "../models/Editor.js";


const loginEditor = async (req, res, next) => {

  try {
    const { email, password } = req.body;

    // validate email
    const editor = await Editor.findOne({ email });
    if (!editor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // validate password
    if (editor.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    // Return editor ID as token
    res.status(200).json({ token: editor._id });


  } catch (error) {
    next(error);
  }
};



const signupEditor = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if editor exists
    const existingEditor = await Editor.findOne({ email });
    if (existingEditor) {
      return res.status(400).json({ message: 'Editor already exists' });
    }

    // Create new editor
    const newEditor = new Editor({ firstName, lastName, email, password });
    await newEditor.save();

    // Return success message
    res.status(200).json({ message: 'Editor created successfully' });
  }
  catch (error) {
    next(error);
  }
};



// const getOneEditor = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     // Find editor by ID
//     const editor = await Editor.findById(id);

//     if (!editor) {
//       return res.status(404).json({ message: 'Editor not found' });
//     }

//     // Return editor
//     res.status(200).json({ success: true, data: editor });
//   } catch (error) {
//     next(error)
//   }
// };


const getAllEditors = async (req, res, next) => {
  try {
    // Find all editors
    const editors = await Editor.find();

    // Return editors
    res.status(200).json({ success: true, data: editors });
  } catch (error) {
    next(error);
  }
};


export { loginEditor, signupEditor, getAllEditors };