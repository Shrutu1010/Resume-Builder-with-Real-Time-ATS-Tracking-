import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(elementId: string, filename: string = 'resume.pdf'): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume element not found');
    }

    // Create a temporary container with white background
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '8.5in';
    tempContainer.style.minHeight = '11in';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.padding = '0';
    tempContainer.style.margin = '0';
    tempContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    
    // Clone the resume content
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.width = '100%';
    clonedElement.style.minHeight = '11in';
    clonedElement.style.backgroundColor = 'white';
    clonedElement.style.boxShadow = 'none';
    clonedElement.style.border = 'none';
    
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // Generate canvas with high quality
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 816, // 8.5 inches at 96 DPI
      height: 1056, // 11 inches at 96 DPI
      scrollX: 0,
      scrollY: 0,
    });

    // Remove temporary container
    document.body.removeChild(tempContainer);

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    // Calculate dimensions to fit the page
    const pdfWidth = 8.5;
    const pdfHeight = 11;
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Calculate scaling to fit within page margins
    const ratio = Math.min(pdfWidth / (imgWidth / 96), pdfHeight / (imgHeight / 96));
    const scaledWidth = (imgWidth / 96) * ratio;
    const scaledHeight = (imgHeight / 96) * ratio;
    
    // Center the image on the page
    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}

export function generateFilename(personalInfo: { fullName?: string }): string {
  const name = personalInfo.fullName || 'Resume';
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_');
  const date = new Date().toISOString().split('T')[0];
  return `${cleanName}_Resume_${date}.pdf`;
}