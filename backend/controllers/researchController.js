const ResearchPaper = require('../models/ResearchPaper');

// @desc    Get all research papers with search & filter
// @route   GET /api/research
// @access  Public
exports.getResearchPapers = async (req, res) => {
  try {
    const { category, search, author } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (author) {
      query.author = { $regex: author, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { abstract: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const papers = await ResearchPaper.find(query).sort({ publicationDate: -1 });
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get research paper by ID
// @route   GET /api/research/:id
// @access  Public
exports.getResearchPaperById = async (req, res) => {
  try {
    const paper = await ResearchPaper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Research paper not found' });
    }
    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a research paper
// @route   POST /api/research
// @access  Private (Researcher, Admin, Institution)
exports.createResearchPaper = async (req, res) => {
  try {
    const { title, abstract, author, category, tags, doi, pdfUrl, status } = req.body;

    const paper = new ResearchPaper({
      title,
      abstract,
      author: author || req.user.name,
      authorId: req.user._id,
      category,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      doi: doi || `10.1016/geopol.${Date.now()}`,
      pdfUrl: pdfUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      status: status || 'Published'
    });

    const createdPaper = await paper.save();
    res.status(201).json(createdPaper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a research paper
// @route   PUT /api/research/:id
// @access  Private (Author / Admin)
exports.updateResearchPaper = async (req, res) => {
  try {
    const paper = await ResearchPaper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ message: 'Research paper not found' });
    }

    if (req.user.role !== 'Admin' && paper.authorId && paper.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this research paper' });
    }

    paper.title = req.body.title || paper.title;
    paper.abstract = req.body.abstract || paper.abstract;
    paper.category = req.body.category || paper.category;
    paper.author = req.body.author || paper.author;
    if (req.body.tags) {
      paper.tags = Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(',').map(t => t.trim());
    }
    paper.pdfUrl = req.body.pdfUrl || paper.pdfUrl;
    paper.status = req.body.status || paper.status;

    const updatedPaper = await paper.save();
    res.json(updatedPaper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a research paper
// @route   DELETE /api/research/:id
// @access  Private (Author / Admin)
exports.deleteResearchPaper = async (req, res) => {
  try {
    const paper = await ResearchPaper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ message: 'Research paper not found' });
    }

    if (req.user.role !== 'Admin' && paper.authorId && paper.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this research paper' });
    }

    await ResearchPaper.deleteOne({ _id: paper._id });
    res.json({ message: 'Research paper removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
