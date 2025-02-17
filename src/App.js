import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactDocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import EmailPreview from './EmailPreview';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
  const apiendPoint1 = 'http://localhost:8080/fileviewer/file';
  const apiendPoint2 = 'http://localhost:8080/fileviewer/readfile';
  const apiendPoint3 = 'http://localhost:8080/fileviewer/readmsg';

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
        .then(response => response.json())
        .then(data => {
          setSelectedEmail(data);
        });
    } else if (selectedParams === 'txt') {
        fetch(`${apiendPoint1}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
          console.log(data);
          const str = data.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\t/g, "\u00a0").replace(/\n/g, '<br/>');
          setSelectedText(str);
        });
    } else if (selectedParams === 'png') {
        fetch(`${apiendPoint2}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
          setImageUrl(data);
         console.log(data);
        });        
       } else if (selectedParams === 'jpeg') {
        fetch(`${apiendPoint1}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.blob())
        .then(blob => {
          const objectURL = URL.createObjectURL(blob);
          console.log(objectURL);
          setImageUrl(objectURL);
        });
    } else if (selectedParams === 'pdf') {
      fetch(`${apiendPoint1}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.arrayBuffer())
        .then(data => {
          console.log(data);
          const blob = new Blob([new Uint8Array(data)], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          setpdfUrl(url);
        });
    } else if (selectedParams === 'excel') {
        fetch(`${apiendPoint2}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
          setSelectedDocument(data);
        });      
    } else if (selectedParams === 'word') {
        fetch(`${apiendPoint2}?filetype=${selectedParams}&fileurl=${selectedUrl}`)
        .then(response => response.text())
        .then(data => {
          setSelectedDocument(data);
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
      {(selectedParams === 'word' && selectedDocument) && (
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
      )}
      {error && <p>{error}</p>}
      {selectedParams === 'msg' ? <EmailPreview
        from={selectedEmail.from}
        to={selectedEmail.to}
        subject={selectedEmail.subject}
        body={selectedEmail.body}
        bcc={selectedEmail.bcc}
      /> : ''}
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