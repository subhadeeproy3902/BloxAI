const express = require('express');
const fs = require('fs');
const pdf = require('html-pdf'); //If the file the user is providing in HTML conversion
const pptxgen = require('pptxgenjs');

const app = express();

// Endpoint to download editor.tsx
app.get('/download/:format', (req, res) => {
    const format = req.params.format.toLowerCase();
    const editorFile = 'editor.tsx';

    fs.readFile(editorFile, 'utf8', (err, data) => {  // I have assumed to be mostly english so UTF-8
        if (err) {
            return res.status(500).send('Error reading file');
        }

        switch (format) { // as per the case I have used a switch case format.
            case 'pdf':

                pdf.create(data).toBuffer((err, buffer) => {
                    if (err) {
                        return res.status(500).send('Error generating PDF');
                    }
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=editor.pdf');
                    res.send(buffer);
                });
                break;
            case 'ppt':
                // Convert data to PPT using pptxgenjs
                // Well this might not work for older versions of module installer
                const pptx = new pptxgen();
                const slide = pptx.addSlide();
                slide.addText(data, { x: 1, y: 1, w: '90%', h: '90%' });
                const pptxBlob = pptx.writeBuffer();
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
                res.setHeader('Content-Disposition', 'attachment; filename=editor.pptx');
                res.send(pptxBlob);
                break;
            default:
                res.status(400).send('Unsupported format');
        }
    });
});

// Listen on port 3000
//change the port as per the required ports
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
