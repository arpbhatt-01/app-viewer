import React, { useState } from 'react';
import ReactDocViewer ,{DocViewerRenderers} from '@cyntler/react-doc-viewer';
const App = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedUrl, setUrl] = useState(null);

  
  
  
  const documents = [
    {
      id: 1,
      name: 'Document 1 (PDF)',
      uri:require("./sample.pdf"),
      // A sample document link
      fileType: 'pdf',  // Can be 'pdf', 'docx', 'html' etc.
    },
    {
      id: 2,
      name: 'Document 2 (jpg)',
      uri: require("./dummyimage.jpg"),  // Replace with your own document URL
      fileType: 'jpg',
    },
    {
      id: 3,
      name: 'Document 3 (DOCX)',
      uri: require('./sample_word.docx'),
      fileType: 'docx',
    },
    {
      id: 4,
      name: 'Document 4 (xlsx)',
      uri: require('./sample_excel.xlsx'),
      fileType: 'xlsx',
    },
    {
      id: 5,
      name: 'Document 5 (Text)',
      uri: require('./sample_text.txt'),
      fileType: 'txt',
    },
  ];
  let apiUrl = "";
  const fetchFile = async () => {
    try {

      //https://view.officeapps.live.com/op/embed.aspx?src=<your-public-url>

      //pdf
      //apiUrl = "http://localhost:8080/fileviewer/file?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"

      //png
      apiUrl = "http://localhost:8080/fileviewer/file?url=https://cdn-icons-png.flaticon.com/512/3460/3460831.png";

      //jpeg
      //apiUrl= "http://localhost:8080/fileviewer/file?url=https://pixabay.com/images/download/people-2944065_640.jpg";
      
      // word
      //apiUrl = "http://localhost:8080/fileviewer/file?url=https://w3.pppl.gov/communications/web/D-Site_Work_Permit.doc";
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      setUrl(apiUrl); // Set the API URL as the file source
     const document = {
        id: 1,
        uri:selectedUrl,
      }
      setSelectedDocument(document)
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };
  const [error, setError] = useState(null);
   let s1 = "https://docs.google.com/gview?url=";
   let s2= s1+apiUrl;
  return (
    <div className="App">
      <h1>React Doc Viewer Demo</h1>

      
            <button onClick={() => fetchFile()}>
              View document/pdf file
            </button>
      

      {selectedDocument && (
        <ReactDocViewer
          documents={[selectedDocument]}    
          renderAnnotationLayer={false}   
          prefetchMethod="GET"   
           onError={(e) => setError(`Failed to load document: ${e.message}`)}
           pluginRenderers={DocViewerRenderers}

        />
      )}
            {error && <p>{error}</p>}

   
         
{/* 
        <iframe src="https://docs.google.com/gview?url=http://localhost:8080/fileviewer/file?url=https://w3.pppl.gov/communications/web/D-Site_Work_Permit.doc&embedded=true" width="100%" height="600px"></iframe>
        <iframe src={s2} width="100%" height="600px"></iframe>  */}

        </div>
  );
};

export default App;
