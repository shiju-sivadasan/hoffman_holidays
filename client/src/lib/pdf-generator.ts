import type { Package } from "@shared/schema";

export interface PDFGenerationOptions {
  includeItinerary?: boolean;
  includeHighlights?: boolean;
  includeInclusions?: boolean;
  includeImages?: boolean;
}

export class PDFGenerator {
  static async generatePackageItinerary(
    pkg: Package, 
    options: PDFGenerationOptions = {}
  ): Promise<string> {
    const {
      includeItinerary = true,
      includeHighlights = true,
      includeInclusions = true,
      includeImages = false
    } = options;

    // Create a comprehensive HTML document for PDF generation
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pkg.title} - Detailed Itinerary</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #374151;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #0EA5E9;
            padding-bottom: 30px;
            margin-bottom: 40px;
          }
          .logo {
            color: #0EA5E9;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .package-title {
            font-size: 36px;
            font-weight: bold;
            color: #374151;
            margin-bottom: 15px;
          }
          .package-meta {
            display: flex;
            justify-content: center;
            gap: 30px;
            font-size: 16px;
            color: #6B7280;
          }
          .section {
            margin-bottom: 40px;
          }
          .section-title {
            font-size: 24px;
            font-weight: bold;
            color: #374151;
            margin-bottom: 20px;
            border-left: 4px solid #0EA5E9;
            padding-left: 15px;
          }
          .overview {
            background: #F9FAFB;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 30px;
          }
          .highlights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
          }
          .highlight-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
          }
          .highlight-icon {
            color: #059669;
            font-weight: bold;
            margin-top: 2px;
          }
          .itinerary-day {
            display: flex;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #E5E7EB;
          }
          .day-number {
            flex-shrink: 0;
            width: 50px;
            height: 50px;
            background: #0EA5E9;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
            margin-right: 20px;
          }
          .day-content h4 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #374151;
          }
          .day-content p {
            color: #6B7280;
          }
          .inclusions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
          }
          .inclusion-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 10px;
            background: #F0F9FF;
            border-radius: 6px;
          }
          .inclusion-icon {
            color: #0EA5E9;
            font-weight: bold;
            margin-top: 2px;
          }
          .price-section {
            background: linear-gradient(135deg, #0EA5E9, #38BDF8);
            color: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            margin-top: 40px;
          }
          .price {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 2px solid #E5E7EB;
            text-align: center;
            color: #6B7280;
          }
          .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
          }
          @media print {
            body { padding: 20px; }
            .page-break { page-break-before: always; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">WanderWise</div>
          <h1 class="package-title">${pkg.title}</h1>
          <div class="package-meta">
            <span>${pkg.duration} Days</span>
            <span>Up to ${pkg.maxPeople} People</span>
            <span class="capitalize">${pkg.category}</span>
          </div>
        </div>

        <div class="overview">
          <p style="font-size: 18px; text-align: center;">${pkg.description}</p>
        </div>

        ${includeHighlights ? `
        <div class="section">
          <h2 class="section-title">Package Highlights</h2>
          <div class="highlights-grid">
            ${pkg.highlights.map(highlight => `
              <div class="highlight-item">
                <span class="highlight-icon">✓</span>
                <span>${highlight}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        ${includeItinerary ? `
        <div class="section page-break">
          <h2 class="section-title">Daily Itinerary</h2>
          ${pkg.itinerary.map(day => `
            <div class="itinerary-day">
              <div class="day-number">${day.day}</div>
              <div class="day-content">
                <h4>Day ${day.day}: ${day.title}</h4>
                <p>${day.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${includeInclusions ? `
        <div class="section">
          <h2 class="section-title">What's Included</h2>
          <div class="inclusions">
            ${pkg.includes.map(item => `
              <div class="inclusion-item">
                <span class="inclusion-icon">✓</span>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <div class="price-section">
          <div class="price">RS{(pkg.price / 100).toLocaleString()}</div>
          <p>Starting price per person</p>
        </div>

        <div class="footer">
          <h3 style="color: #0EA5E9; margin-bottom: 15px;">Contact Information</h3>
          <div class="contact-info">
            <div>
              <strong>Phone:</strong><br>
              +1 (555) 123-4567
            </div>
            <div>
              <strong>Email:</strong><br>
              info@wanderwise.com
            </div>
            <div>
              <strong>Website:</strong><br>
              www.wanderwise.com
            </div>
            <div>
              <strong>Address:</strong><br>
              123 Adventure Street<br>
              Travel City, TC 12345
            </div>
          </div>
          <p style="margin-top: 30px; font-style: italic;">
            This itinerary is subject to change based on weather conditions, local events, and availability. 
            All prices are in USD and subject to change. Terms and conditions apply.
          </p>
          <p style="margin-top: 20px;">
            Generated on ${new Date().toLocaleDateString()} | © 2024 WanderWise Travel Agency
          </p>
        </div>
      </body>
      </html>
    `;

    return htmlContent;
  }

  static async downloadPackageItinerary(pkg: Package, options?: PDFGenerationOptions): Promise<void> {
    try {
      // In a real implementation, you would use a library like jsPDF or Puppeteer
      // For now, we'll create a downloadable HTML file that can be printed to PDF
      const htmlContent = await this.generatePackageItinerary(pkg, options);
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${pkg.title.replace(/[^a-zA-Z0-9]/g, '_')}_Itinerary.html`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      // Show instructions to user
      alert(`Itinerary downloaded as HTML file. To convert to PDF:
      
1. Open the downloaded file in your browser
2. Use Ctrl+P (Cmd+P on Mac) to print
3. Select "Save as PDF" as destination
4. Click "Save"

The file has been optimized for PDF conversion with proper page breaks and formatting.`);
      
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      throw new Error('Failed to generate itinerary PDF');
    }
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  }

  static formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  }
}

export default PDFGenerator;
