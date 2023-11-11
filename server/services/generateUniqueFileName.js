function generateUniqueFileName(extension) {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const uniqueFileName = `IMG${timestamp}.${extension}`;
    
    return uniqueFileName;
  }
  module.exports = generateUniqueFileName;
  