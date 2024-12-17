import { jsPDF } from 'jspdf';
import type { BusinessCanvas } from '@/types';

interface PDFDimensions {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  boxWidth: number;
  boxHeight: number;
}

function initializePDF(): [jsPDF, PDFDimensions] {
  const pdf = new jsPDF('landscape', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  
  // Calculate dimensions to match standard Business Model Canvas proportions
  const usableWidth = pageWidth - (margin * 2);
  const usableHeight = pageHeight - margin * 2 - 20; // Account for header

  // Standard BMC proportions: 2-2-2-2-2 for width (total 10 units)
  const unitWidth = usableWidth / 10;
  
  const dimensions: PDFDimensions = {
    pageWidth,
    pageHeight,
    margin,
    boxWidth: unitWidth * 2, // Each major section is 2 units wide
    boxHeight: (usableHeight - margin) / 3
  };

  return [pdf, dimensions];
}

function addSection(
  pdf: jsPDF,
  title: string,
  items: string[],
  x: number,
  y: number,
  width: number,
  height: number
): void {
  // Draw box
  pdf.setDrawColor(0);
  pdf.setLineWidth(0.1);
  pdf.rect(x, y, width, height);

  // Add title
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text(title, x + 2, y + 5);

  // Add content with bullets
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  
  const safeItems = Array.isArray(items) ? items : [];
  let yOffset = 10;
  
  safeItems.forEach(item => {
    const lines = pdf.splitTextToSize(`• ${item}`, width - 4);
    pdf.text(lines, x + 2, y + yOffset);
    yOffset += lines.length * 4;
  });
}

export function generateBusinessCanvasPDF(canvas: BusinessCanvas): string {
  const [pdf, dimensions] = initializePDF();
  const { margin, boxWidth, boxHeight, pageWidth } = dimensions;
  
  // Add header (title and date)
  pdf.setFontSize(16);
  pdf.text(canvas.name, margin, margin + 6);
  pdf.setFontSize(8);
  pdf.text(`Generated: ${new Date(canvas.generated).toLocaleDateString()}`, 
    margin, margin + 12);

  const startY = margin + 20;
  const doubleHeight = boxHeight * 2;

  // Key Partners (2 units tall)
  addSection(pdf, 'Key Partners', canvas.keyPartners, 
    margin, startY, boxWidth, doubleHeight);

  // Key Activities & Key Resources (1 unit each)
  addSection(pdf, 'Key Activities', canvas.keyActivities,
    margin + boxWidth, startY, boxWidth, boxHeight);
  addSection(pdf, 'Key Resources', canvas.keyResources,
    margin + boxWidth, startY + boxHeight, boxWidth, boxHeight);

  // Value Propositions (2 units tall)
  addSection(pdf, 'Value Propositions', canvas.valuePropositions,
    margin + boxWidth * 2, startY, boxWidth, doubleHeight);

  // Customer Relationships & Channels (1 unit each)
  addSection(pdf, 'Customer Relationships', canvas.customerRelationships,
    margin + boxWidth * 3, startY, boxWidth, boxHeight);
  addSection(pdf, 'Channels', canvas.channels,
    margin + boxWidth * 3, startY + boxHeight, boxWidth, boxHeight);

  // Customer Segments (2 units tall)
  addSection(pdf, 'Customer Segments', canvas.customerSegments,
    margin + boxWidth * 4, startY, boxWidth, doubleHeight);

  // Bottom row: Cost Structure & Revenue Streams (3 units each)
  const bottomY = startY + doubleHeight;
  const bottomSectionWidth = (boxWidth * 5) / 2; // Split remaining width in half

  addSection(pdf, 'Cost Structure', canvas.costStructure,
    margin, bottomY, bottomSectionWidth, boxHeight);
  addSection(pdf, 'Revenue Streams', canvas.revenueStreams,
    margin + bottomSectionWidth, bottomY, bottomSectionWidth, boxHeight);

  return pdf.output('datauristring');
} 