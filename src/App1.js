import React, { useState } from 'react';
import ReactDocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import EmailPreview from './EmailPreview';

const App = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedUrl, setUrl] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [selectedImage, setImage] = useState(null);
  const [selectedParams, setParam] = useState(null);
  const [selectedPdf,setpdfUrl] = useState(null)
  const [imageUrl, setImageUrl] = useState('');
  const [documentContent, setDocumentContent] = useState([]);

  let apiUrl = "";
  const fetchFile = async (param) => {
    setParam(param)
    setUrl('')
    setSelectedDocument(null);
    setSelectedEmail('');
    setSelectedText('')
    setImage('');
    setpdfUrl(null);

    try {
      console.log(param);
      switch (param) {
        case 'pdf':
          apiUrl = "http://localhost:8080/fileviewer/file?url=https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf";
          break;
        case 'jpeg':
          apiUrl = "http://localhost:8080/fileviewer/file?url=https://i.imgur.com/TVlVeUV.jpeg";
          break;
        case 'png':
          apiUrl = "http://localhost:8080/fileviewer/file?url=https://cdn-icons-png.flaticon.com/512/3460/3460831.png";
          break;
        case 'word':
          apiUrl = "http://localhost:8080/fileviewer/read-word?url=https://w3.pppl.gov/communications/web/D-Site_Work_Permit.doc";
          break;
        case 'xl':
          apiUrl = "http://localhost:8080/fileviewer/read-excel?url=https://www.tesourodireto.com.br/data/files/EE/E3/A1/59/6266F610BB8E41E6894D49A8/LFT_2019.xls";
          break;
        case 'text':
          apiUrl = "http://localhost:8080/fileviewer/file?url=https://txt2html.sourceforge.net/sample.txt";
          break;
        case 'msg1':
          apiUrl = "http://localhost:8080/fileviewer/read-msg?filePath=C:/Users/arpbhatt/Downloads/ForgotPassword.msg";
          break;
        case 'msg2':
          apiUrl = "http://localhost:8080/fileviewer/read-msg?filePath=C:/Users/arpbhatt/Downloads/CloudConnect.msg";
          break;
        default:
          // return false;
      }
      console.log(apiUrl);
      // API call from backend
      // const response = await fetch(apiUrl);
      // console.log(response);

      // if (!response.ok) {
      //   throw new Error("Failed to fetch file");
      // }

      setUrl(apiUrl); // Set the API URL as the file source
      
      // const document = {
      //   id: 1,
      //   uri: selectedUrl,
      // }
      //setSelectedDocument(document)
      if (param === 'msg1' || param === 'msg2') {
        fetch(apiUrl)
        .then(response=>response.json())
        .then(data=>{ console.log(data);
          setSelectedEmail(data)
         })
      }
      else if(param === 'text'){
        fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
          console.log(data);
          var str = data.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\t/g, "\u00a0").replace(/\n/g, '<br/>');

          setSelectedText(str)
        })
      }
      else if( param === 'png'){
        setImage(apiUrl);
        //selectedDocument(null)
      }
      else if(param ==='jpeg'){
        fetch(apiUrl)
            .then(response => response.blob())
            .then(blob => {
                const objectURL = URL.createObjectURL(blob);
               // setUrl(objectURL);
                console.log('-----------------');
                console.log(objectURL);
                setImageUrl(objectURL);
            })
      }
      else if(param === 'pdf'){
        
        fetch(apiUrl)
        .then(response => response.arrayBuffer())
        .then(data => {
          console.log(data);
          const blob = new Blob([new Uint8Array(data)],{type:'application/pdf'});
          const url = URL.createObjectURL(blob)
          setpdfUrl(url)
        })
      }
      else if(param === 'word'){
        
        // fetch(apiUrl)
        // .then(response => response.arrayBuffer())
        // .then(data => {
        //   console.log(data);
        //   const blob = new Blob([new Uint8Array(data)],{type:'application/msword'});
        //   const url = URL.createObjectURL(blob)
        //   setpdfUrl(url)
        // })

        // fetch(apiUrl)
        // .then(response => response.text())
        // .then(data => {
        //   console.log(data);
        // //  var str = data.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\t/g, "\u00a0").replace(/\n/g, '<br/>');
        //   setSelectedText(data)
        fetch(apiUrl) // Replace with your API endpoint
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.document)) {
            setDocumentContent(data.document);
          } else {
            console.error("Invalid response format:", data);
            setDocumentContent(["Error: Invalid document format."]);
          }
        })
        .catch((error) => console.error("Error fetching document:", error));
      }
      else {
        // const document = {
        //   id: 1,
        //   uri: selectedUrl,
        // }
        // setSelectedDocument(document);
        setSelectedText('');
        setSelectedEmail('')
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };
  const [error, setError] = useState(null);
 
  return (
    <div className="App">
      <h1>React Doc Viewer Demo</h1>


      <button onClick={() => fetchFile('pdf')}>
        View pdf
      </button>

      <button onClick={() => fetchFile('png')}>
        View png
      </button>
      <button onClick={() => fetchFile('jpeg')}>
        View jpeg
      </button>
      <button onClick={() => fetchFile('word')}>
        View word
      </button>
      <button onClick={() => fetchFile('xl')}>
        View xl
      </button>
      <button onClick={() => fetchFile('text')}>
        View text
      </button>
      <button onClick={() => fetchFile('msg1')}>
        View message
      </button>
      {/* <button onClick={() => fetchFile('msg2')}>
        View message with attachement
      </button> */}
      {selectedParams === 'png'  && (
        <img src={selectedUrl}
        />
      )}
      {/* { selectedParams === 'jpeg' || selectedParams === 'jpg' && 
        <img src={imageUrl} alt="JPEG File" width="500px" />
      } */}
      {(selectedParams === 'jpeg' || selectedParams === 'jpg')  && (
        <img src={imageUrl}
        />
      )}
      {/* {selectedParams === 'word'  && (
        <div dangerouslySetInnerHTML={{ __html: documentContent }} />
      )} */}

      {selectedParams === 'word' && (documentContent.map((line, index) => (
        <div dangerouslySetInnerHTML={{ __html: line }} />
        //<p key={index}>{line}</p>
      )))}

      {error && <p>{error}</p>}

      {/* <iframe src='https://view.officeapps.live.com/op/embed.aspx?src=http://localhost:8080/fileviewer/file?url=https://w3.pppl.gov/communications/web/D-Site_Work_Permit.doc' width='100%' height='100%' sandbox="allow-scripts allow-same-origin">This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe> */}

      {/* <iframe src="https://docs.google.com/gview?url=http://localhost:8080/fileviewer/file?url=https://w3.pppl.gov/communications/web/D-Site_Work_Permit.doc&embedded=true"></iframe> */}

     
      {/* <iframe src="http://localhost:8080/fileviewer/read-word?url=https://w3.pppl.gov/communications/web/D-Site_Work_Permit.doc&embedded=true" width="100%" height="600px" sandbox="allow-scripts allow-same-origin"></iframe> */}
        
        {/* <iframe src={s2} width="100%" height="600px" sandbox="allow-scripts allow-same-origin"></iframe>  */}

      {selectedParams === 'msg1' || selectedParams === 'msg2' ? <EmailPreview
        from={selectedEmail.from}
        to={selectedEmail.to}
        subject={selectedEmail.subject}
        body={selectedEmail.body}
        bcc={selectedEmail.bcc}
      /> :''}
      {selectedParams === 'text' || selectedParams === 'word' ?<div  dangerouslySetInnerHTML={{__html: selectedText}} /> : ''}

      {selectedParams === 'pdf' ? <iframe src={selectedPdf} width="100%" height="600px"></iframe>
: ''}
    {/* {selectedParams === 'word' ?  
    <iframe src={`https://docs.google.com/gview?url${encodeURIComponent(selectedPdf)}&embedded=true`} width="100%" height="600px"></iframe>
: ''} */}
    </div>
  );
};

export default App;
