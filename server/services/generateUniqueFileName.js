function generateUniqueFileName(extension) {
    const timeStamp = new Date().getTime();
    const uniqueFileName = `IMG${timeStamp}.${extension}`;
    
    return uniqueFileName;
  }
  module.exports = generateUniqueFileName;
  