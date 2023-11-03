export function createSubmitHandler(callback) {
    return function (event) {
      event.preventDefault();
  
      const form = event.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      callback(data, form);
    };
  };

  export function uploadHandler(callback) {
    return function (event) {
      event.preventDefault();

      const files = document.getElementById('files');
      
      if(files.files.length === 0) {
        return alert('Img file is required !');
      }

      const fileName = files.files[0].name.toLowerCase();
      
      if(!fileName.includes('jpg') && !fileName.includes('png')) {
        return alert('Only jpg or png files are allowed !')
      }
      
      const formData = new FormData();

      formData.append("files", files.files[0]);
  
      callback(formData);
    };
  };

