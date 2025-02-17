import React from 'react';

// Styling for the email preview (inline CSS for simplicity)
const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#f4f4f4',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
  },
  header: {
    padding: '10px 20px',
    backgroundColor: '#0078d4',
    color: 'white',
    borderRadius: '8px 8px 0 0',
  },
  title: {
    fontSize: '22px',
    margin: 0,
  },
  emailDetails: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '0 0 8px 8px',
  },
  detailRow: {
    display: 'flex',
    display: 'flex',
        marginBottom: '10px',
        flexWrap: 'wrap',
        alignContent: 'center',
    
  },
  detailTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  detailContent: {
    color: '#666',
    marginLeft : '6px'
  },
  body: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#0078d4',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    marginTop: '20px',
  },
};

const EmailPreview = ({ from, to,bcc, subject, body }) => {
  return (
    <div style={styles.container}>
      {/* Header section */}
      <div style={styles.header}>
        <h1 style={styles.title}>Email Preview</h1>
      </div>

      {/* Email details section */}
      <div style={styles.emailDetails}>
        <div style={styles.detailRow}>
          <div style={styles.detailTitle}>From:</div>
          <div style={styles.detailContent}>{from}</div>
        </div>
        <div style={styles.detailRow}>
          <div style={styles.detailTitle}>To:</div>
          <div style={styles.detailContent}>{to}</div>
        </div>
        <div style={styles.detailRow}>
          <div style={styles.detailTitle}>Bcc:</div>
          <div style={styles.detailContent}>{bcc}</div>
        </div>
        <div style={styles.detailRow}>
          <div style={styles.detailTitle}>Subject:</div>
          <div style={styles.detailContent}>{subject}</div>
        </div>

        {/* Email body */}
        <p style={styles.body}>{body}</p>

        {/* Action Button */}
        {/* <a href="mailto:" style={styles.button}>
          Reply to Email
        </a> */}
      </div>
    </div>
  );
};

// Example usage of the EmailPreview component
// const App = () => {
//   const emailData = {
//     from: 'sender@example.com',
//     to: 'receiver@example.com',
//     subject: 'This is the subject line',
//     body: 'Hello, this is the email body. Feel free to reply to this email.',
//   };

//   return (
//     <div>
//       <EmailPreview
//         from={from}
//         to={to}
//         subject={subject}
//         body={body}
//       />
//     </div>
//   );
// };

export default EmailPreview;
