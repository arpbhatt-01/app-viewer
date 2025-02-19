import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactDocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import EmailPreview from './EmailPreview';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Buffer} from 'buffer';

const AppFileViewer = React.memo(() => {
  console.log('Component rendered');
  const fileObj = useMemo(() => new URLSearchParams(window.location.search), []);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedUrl, setUrl] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [selectedImage, setImage] = useState(null);
  const [selectedParams, setParam] = useState(null);
  const [selectedPdf, setpdfUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [documentContent, setDocumentContent] = useState([]);
  const [error, setError] = useState(null);
  const officeViewerBase = "https://view.officeapps.live.com/op/embed.aspx?src=";

  // const apiendPoint1 = 'http://localhost:8080/fileviewer/file';
  // const apiendPoint2 = 'http://localhost:8080/fileviewer/readfile';
  // const apiendPoint3 = 'http://localhost:8080/fileviewer/readmsg';
  // const apiendPoint4 = 'http://localhost:8080/fileviewer/readfilepng';

  const apiendPoint1 = 'http://3.82.214.180:8080/fileviewer/fileviewer/file';
  const apiendPoint2 = 'http://3.82.214.180:8080/fileviewer/fileviewer/readfile';
  const apiendPoint3 = 'http://3.82.214.180:8080/fileviewer/fileviewer/readmsg';
  const apiendPoint4 = 'http://3.82.214.180:8080/fileviewer/readfilepng';

  const styles = {
    marginLeft: '1%',
  };

  useEffect(() => {
    const filetype = fileObj.get("filetype");
    const fileurl = fileObj.get("fileurl");

    if (filetype !== selectedParams) {
      setParam(filetype);
    }
    if (fileurl !== selectedUrl) {
      setUrl(fileurl);
    }
  }, [fileObj, selectedParams, selectedUrl]);

  const fetchData = useCallback(() => {
    if (selectedParams === 'msg') {
      fetch(`${apiendPoint3}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
const jsonString = atob(data);
const obj = JSON.parse(jsonString);
setSelectedEmail(obj)
        });
    } else if (selectedParams === 'txt') {
        fetch(`${apiendPoint1}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
          
          const jsonString = Buffer.from(data,'base64').toString('utf-8');
          const str = jsonString.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\t/g, "\u00a0").replace(/\n/g, '<br/>');
          setSelectedText(str);
        });
    } else if (selectedParams === 'png') {
        fetch(`${apiendPoint4}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
          const url = `data:image/png;base64,${data}`;
          setImageUrl(url);
        });        
       } else if (selectedParams === 'jpeg') {
        fetch(`${apiendPoint1}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
         
          //const base64Pdf = data.base64Pdf;
          const url = `data:image/jpeg;base64,${data}`;
          setImageUrl(url);
        });
    } else if (selectedParams === 'pdf') {
      fetch(`${apiendPoint1}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
          const base64Pdf = data;
           const url = `data:application/pdf;base64,${base64Pdf}`;
           setpdfUrl(url);
        });
    } else if (selectedParams === 'excel') {
        fetch(`${apiendPoint2}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
          const embeddedUrl = data.includes(officeViewerBase) ? data : `${officeViewerBase}${encodeURIComponent(data)}`;
          setSelectedDocument(embeddedUrl);
        });      
    } else if (selectedParams === 'word') {
        fetch(`${apiendPoint2}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
          //setSelectedDocument(data);
          // const safeUrl = data.replaceAll(' ',"%20");
          // console.log(safeUrl);
          // setSelectedDocument(safeUrl);
          const embeddedUrl = data.includes(officeViewerBase) ? data : `${officeViewerBase}${encodeURIComponent(data)}`;
          // const safeUrl = encodeURIComponent(data);
           setSelectedDocument(embeddedUrl);
        });    
    } else {
      setSelectedText('');
      setSelectedEmail('');
    }
  }, [selectedParams, selectedUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <h1>React Doc Viewer</h1>
      {selectedParams === 'png' && <img src={imageUrl} alt="PNG" />}
      {(selectedParams === 'jpeg' || selectedParams === 'jpg') && <img src={imageUrl} alt="JPEG" />}
      {/* {(selectedParams === 'word' && selectedDocument) && (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${selectedDocument}`}
          width="100%" height="600px" sandbox="allow-scripts allow-forms allow-same-origin"
        ></iframe>
      )}
      {(selectedParams === 'excel' && selectedDocument) && (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${selectedDocument}`}
          width="100%" height="600px" sandbox="allow-scripts allow-forms allow-same-origin"
        ></iframe>
      )} */}
     
     

      {(selectedParams === 'word' && selectedDocument) && (
        
        //  <iframe
        //  src={selectedDocument.includes('https://view.officeapps.live.com') === true ? {selectedDocument}  :
        //   `https://view.officeapps.live.com/op/embed.aspx?src=${selectedDocument}`}
        //   width="100%" height="600px" sandbox="allow-scripts allow-forms allow-same-origin"
        //  ></iframe>
        <iframe 
      src={selectedDocument} 
      width="100%" 
      height="600px" 
      style={{ border: "none" }}
    ></iframe>
      )}
      {(selectedParams === 'excel' && selectedDocument) && (
        // <iframe
        // src={selectedDocument?.includes('https://view.officeapps.live.com') ? {selectedDocument}  :
        //  `https://view.officeapps.live.com/op/embed.aspx?src=${selectedDocument}`}
        //  width="100%" height="600px" sandbox="allow-scripts allow-forms allow-same-origin"
        // ></iframe>
        <iframe 
      src={selectedDocument} 
      width="100%" 
      height="600px" 
      style={{ border: "none" }}
    ></iframe>
      )}
      {error && <p>{error}</p>}
      {selectedParams === 'msg' ? <EmailPreview
        from={selectedEmail.from}
        to={selectedEmail.to}
        subject={selectedEmail.subject}
        body={selectedEmail.body}
        bcc={selectedEmail.bcc}
      /> : ''}
      {/* {selectedParams === 'text' ? <div style={styles} dangerouslySetInnerHTML={{ __html: selectedText }} /> : ''} */}
      {selectedParams === 'txt' ? <iframe srcdoc={selectedText} width="100%" height="600px"></iframe>
        : ''}
      {selectedParams === 'pdf' ? <iframe src={`${selectedPdf}#toolbar=0`} width="100%" height="600px"></iframe> : ''}
    </div>
  );
});

const App = () => (
  <Router>
    <Routes>
      <Route path="/fileviewer" element={<AppFileViewer />} />
    </Routes>
  </Router>
);

export default App;