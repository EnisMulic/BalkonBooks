const book = {
    isbn: String, // International Standard Book Number (unique)
    title: String,
    pages: Number, // Total page numbers
    published: Number, // Year of publication
    authors: [], // Zero, one or multiple authors,
    image: String, // URL of image
};

module.exports = book;
