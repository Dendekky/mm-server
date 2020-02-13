import { check, body, validationResult } from 'express-validator';
import BlogDraft from '../models/blogdraft';


const createDraft = [
  check('title').isLength({ min: 3 }).withMessage('Please input a title'),
  body('category').isLength({ min: 3 }).withMessage('input category'),
  check('body').isLength({ min: 3 }).withMessage('Please input the blog'),
  check('metadata').isLength({ min: 3 }).withMessage('Please input the summary'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(406).send({
        errors: errors.array(),
        status: 406,
      });
    } else {
      const { title } = req.body;
      const { category } = req.body;
      const { body } = req.body;
      const { metadata } = req.body;
      const { postImage } = req.body;

      const draft = new BlogDraft({
        title,
        category,
        body,
        metadata,
        postImage,
      });
      draft.save((err) => {
        if (err) {
          return res.status(500).send({
            status: 500,
            message: 'Internal server error',
          });
        }
        res.status(201).send({
          status: 201,
          success: 'saved to draft',
        });
      });
    }
  },
];

const getAllDrafts = (req, res) => BlogDraft.find({}, (err, drafts) => {
  if (err) {
    res.status(500).send({
      status: 500,
      message: 'Internal server error',
    });
  }
  res.status(200).send({
    status: 200,
    drafts,
  });
});


const getDraft = (req, res) => BlogDraft.findById(req.params.id, (err, draft) => {
  if (err) {
    res.status(500).send({
      message: 'Internal server error',
    });
  }
  res.status(200).send({
    draft,
  });
});


const updateDraft = [
  check('title').isLength({ min: 3 }).withMessage('Please input a title'),
  body('category').isLength({ min: 3 }).withMessage('input category'),
  check('body').isLength({ min: 3 }).withMessage('Please input the blog'),
  check('metadata').isLength({ min: 3 }).withMessage('Please input the summary'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(406).send({
        errors: errors.array(),
        status: 406,
      });
    } else {
      BlogDraft.findByIdAndUpdate(
        req.params.id, req.body,
        { upsert: true }, (err, draft) => {
          if (err) {
            res.status(500).send({
              message: 'Internal server error',
            });
          }
          res.status(201).send({
            message: 'update successful',
          });
        },
      );
    }
  },
];


const deleteDraft = (req, res) => BlogDraft.findByIdAndRemove(req.params.id, (err, del) => {
  if (err) {
    res.status(500).send({
      message: 'Internal server error',
    });
  }
  res.status(200).send({
    message: 'post deleted',
  });
});


module.exports = {
  createDraft,
  getAllDrafts,
  getDraft,
  updateDraft,
  deleteDraft,
};
