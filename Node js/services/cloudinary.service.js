const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dgaic4aj8',
  api_key: '159774316676778',
  api_secret: 'ePL7lSY6tSzD2ujgFwtDDRkiDXc',
})

const uploadImage = async (req, res, next) => {
  const uploadedImages = [];
  for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path)
      uploadedImages.push(result.secure_url)
  }
  req.imageUrl = uploadedImages;
  next()
}

module.exports = uploadImage
