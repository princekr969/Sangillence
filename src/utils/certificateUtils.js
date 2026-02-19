import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default async function handleDownloadCertificate(result, pool, certificate_type = "Participation") {
  const studentName = result?.Name || "Student";
  
  // Create a hidden container for the certificate
  const certificateContainer = document.createElement('div');
  certificateContainer.style.position = 'absolute';
  certificateContainer.style.left = '-9999px';
  certificateContainer.style.top = '-9999px';
  certificateContainer.style.width = '1100px';
  certificateContainer.style.height = '750px';
  
  const imageUrl = `${window.location.origin}/certificate/Certificate_of_Participation.png`;
  
  // Set the HTML content
  certificateContainer.innerHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Pinyon+Script&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #111;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .certificate {
          width: 1100px;
          height: 750px;
          position: relative;
          background: url("${imageUrl}") no-repeat center center;
          background-size: cover;
          font-family: 'Montserrat', sans-serif;
          color: #1d1f27;
        }
        .content {
          position: absolute;
          width: 100%;
          top: 300px;
          text-align: center;
          padding: 0 100px;
          box-sizing: border-box;
        }
        .name {
        font-family: 'Parisienne', cursive;
          font-size: 45px;
          margin: 20px 0 10px;
        }
        .line {
          width: 60%;
          height: 1px;
          background: #aaa;
          margin: 0 auto 25px;
        }
        .description {
          font-size: 18px;
          line-height: 1.6;
          width: 75%;
          margin: auto;
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="content">
          <div class="name">${studentName}</div>
          <div class="line"></div>
          <div class="description">
          This certificate is conferred upon ${studentName} of Class ${result?.Class}, ${result?.School},
for participating in the Sangillence Open Book Olympiad 2025
and contributing to a progressive benchmark in next-generation assessment
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  document.body.appendChild(certificateContainer);
  
  try {
    // Wait for fonts and images to load
    await document.fonts.ready;
    
    // Convert to canvas
    const canvas = await html2canvas(certificateContainer.querySelector('.certificate'), {
      scale: 2, // Higher quality
      backgroundColor: '#ffffff',
      allowTaint: false,
      useCORS: true,
      logging: false,
      windowWidth: 1100,
      windowHeight: 750
    });
    
    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1100, 750]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, 1100, 750);
    
    pdf.save(`Certificate_${certificate_type}_${studentName.replace(/\s+/g, "_")}.pdf`);
    
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    document.body.removeChild(certificateContainer);
  }
};