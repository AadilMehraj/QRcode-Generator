import inquirer from 'inquirer';
import qr_image from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'website',
      message: 'Enter website:',
    }
  ])
  .then((answers) => {
    const data = answers.website;
    const qrCode = qr_image.image(data, { type: 'png' }); 
    qrCode.pipe(fs.createWriteStream('qrCode.png')); 
    fs.writeFile('URL', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Error occurred");
    } else {
      // Something else went wrong
      console.log("Error occurred", error);
    }
  });
