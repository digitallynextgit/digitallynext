// Email templates with modern styling for job applications

// Type for application data
type ApplicationData = {
  name: string;
  email: string;
  phone: string;
  position: string;
  positionName: string;
  linkedin: string;
  message: string;
};

// Colors and styling variables
const colors = {
  primary: '#ef4444', // Red-600
  secondary: '#111827', // Gray-900
  background: '#f3f4f6', // Gray-100
  white: '#ffffff',
  lightGray: '#f9fafb', // Gray-50
  midGray: '#e5e7eb', // Gray-200
  darkGray: '#6b7280', // Gray-500
  success: '#059669', // Green-600
};

// Company info
const companyInfo = {
  name: 'Your Company Name',
  logo: 'https://via.placeholder.com/150x50?text=Your+Logo',
  website: 'https://yourwebsite.com',
  address: '123 Business Street, City, Country',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/yourcompany',
    twitter: 'https://twitter.com/yourcompany',
    instagram: 'https://instagram.com/yourcompany',
  },
};

/**
 * Generate a confirmation email to send to the applicant
 */
export function generateApplicantEmail(data: ApplicationData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Confirmation</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: ${colors.secondary};
          background-color: ${colors.background};
          margin: 0;
          padding: 0;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: ${colors.white};
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .email-header {
          background-color: ${colors.secondary};
          padding: 30px 20px;
          text-align: center;
        }
        
        .email-logo {
          max-width: 140px;
          height: auto;
        }
        
        .confirmation-badge {
          background-color: ${colors.success};
          color: white;
          font-size: 16px;
          font-weight: 600;
          padding: 6px 16px;
          border-radius: 30px;
          display: inline-block;
          margin-top: 15px;
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .email-content {
          padding: 30px 20px;
          background-color: ${colors.white};
        }
        
        .email-heading {
          color: ${colors.secondary};
          font-size: 24px;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 15px;
        }
        
        .email-text {
          font-size: 16px;
          color: ${colors.secondary};
          margin-bottom: 20px;
        }
        
        .application-details {
          background-color: ${colors.lightGray};
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid ${colors.primary};
        }
        
        .detail-row {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid ${colors.midGray};
          display: flex;
        }
        
        .detail-row:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .detail-label {
          font-weight: 600;
          width: 120px;
          color: ${colors.secondary};
        }
        
        .detail-value {
          flex: 1;
        }
        
        .next-steps {
          background-color: ${colors.lightGray};
          border-radius: 8px;
          padding: 20px;
          margin-top: 30px;
        }
        
        .next-steps-item {
          display: flex;
          margin-bottom: 15px;
          align-items: flex-start;
        }
        
        .step-number {
          background-color: ${colors.primary};
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          margin-right: 15px;
          flex-shrink: 0;
        }
        
        .email-button {
          display: inline-block;
          background-color: ${colors.primary};
          color: white;
          font-weight: 600;
          text-decoration: none;
          padding: 12px 30px;
          border-radius: 4px;
          margin-top: 20px;
          text-align: center;
          transition: background-color 0.2s;
        }
        
        .email-button:hover {
          background-color: #dc2626;
        }
        
        .email-footer {
          background-color: ${colors.lightGray};
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: ${colors.darkGray};
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        
        .social-link {
          display: inline-block;
          margin: 0 10px;
        }
        
        .footer-links {
          margin-top: 15px;
        }
        
        .footer-link {
          color: ${colors.primary};
          text-decoration: none;
          margin: 0 10px;
        }
        
        @media only screen and (max-width: 480px) {
          .email-container {
            width: 100%;
            border-radius: 0;
          }
          
          .detail-row {
            flex-direction: column;
          }
          
          .detail-label {
            width: 100%;
            margin-bottom: 5px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <img src="${companyInfo.logo}" alt="${companyInfo.name}" class="email-logo">
          <div class="confirmation-badge">Application Received</div>
        </div>
        
        <div class="email-content">
          <h1 class="email-heading">Thanks for applying, ${data.name}!</h1>
          
          <p class="email-text">
            We've received your application for <strong>${data.positionName}</strong>. 
            Our team will review your information and get back to you soon.
          </p>
          
          <div class="application-details">
            <div class="detail-row">
              <div class="detail-label">Position</div>
              <div class="detail-value">${data.positionName}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Name</div>
              <div class="detail-value">${data.name}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Email</div>
              <div class="detail-value">${data.email}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Submitted On</div>
              <div class="detail-value">${new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</div>
            </div>
          </div>
          
          <div class="next-steps">
            <h2 style="margin-top: 0; font-size: 18px;">What happens next?</h2>
            
            <div class="next-steps-item">
              <div class="step-number">1</div>
              <div>Our hiring team reviews your application (typically 1-3 business days)</div>
            </div>
            
            <div class="next-steps-item">
              <div class="step-number">2</div>
              <div>If your profile matches our needs, we'll contact you to schedule an initial interview</div>
            </div>
            
            <div class="next-steps-item">
              <div class="step-number">3</div>
              <div>The interview process usually includes 2-3 rounds to assess both technical skills and team fit</div>
            </div>
          </div>
          
          <p class="email-text" style="margin-top: 30px;">
            Want to learn more about what it's like to work with us? Check out our careers page.
          </p>
          
          <a href="${companyInfo.website}/careers" class="email-button">Visit Our Careers Page</a>
        </div>
        
        <div class="email-footer">
          <div class="social-links">
            <a href="${companyInfo.socialLinks.linkedin}" class="social-link">LinkedIn</a>
            <a href="${companyInfo.socialLinks.twitter}" class="social-link">Twitter</a>
            <a href="${companyInfo.socialLinks.instagram}" class="social-link">Instagram</a>
          </div>
          
          <div>
            ${companyInfo.name}<br>
            ${companyInfo.address}
          </div>
          
          <div class="footer-links">
            <a href="${companyInfo.website}/privacy" class="footer-link">Privacy Policy</a>
            <a href="${companyInfo.website}/unsubscribe" class="footer-link">Unsubscribe</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate a notification email to send to the HR team/recruiters
 */
export function generateRecruiterEmail(data: ApplicationData): string {
  // Format the message with line breaks
  const formattedMessage = data.message.replace(/\n/g, '<br>');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Job Application</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: ${colors.secondary};
          background-color: ${colors.background};
          margin: 0;
          padding: 0;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: ${colors.white};
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .email-header {
          background-color: ${colors.primary};
          padding: 30px 20px;
          text-align: center;
          color: white;
        }
        
        .application-badge {
          font-size: 14px;
          font-weight: 600;
          background-color: rgba(255, 255, 255, 0.2);
          padding: 6px 12px;
          border-radius: 20px;
          margin-bottom: 15px;
          display: inline-block;
          animation: fadeInDown 0.5s ease-out;
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .email-heading {
          font-size: 24px;
          margin: 0;
          animation: fadeIn 0.5s ease-out 0.2s both;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .email-content {
          padding: 30px 20px;
        }
        
        .applicant-snapshot {
          display: flex;
          margin-bottom: 30px;
          background-color: ${colors.lightGray};
          border-radius: 8px;
          padding: 20px;
          animation: slideIn 0.6s ease-out;
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .applicant-info {
          flex: 1;
        }
        
        .applicant-name {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 5px 0;
          color: ${colors.secondary};
        }
        
        .applicant-position {
          color: ${colors.primary};
          font-weight: 600;
          margin: 0 0 15px 0;
        }
        
        .applicant-detail {
          display: flex;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .detail-icon {
          width: 20px;
          text-align: center;
          margin-right: 10px;
          color: ${colors.darkGray};
        }
        
        .application-section {
          border-top: 1px solid ${colors.midGray};
          padding-top: 25px;
          margin-top: 25px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 15px 0;
          color: ${colors.secondary};
        }
        
        .application-message {
          background-color: ${colors.lightGray};
          border-radius: 8px;
          padding: 20px;
          margin-top: 15px;
          border-left: 4px solid ${colors.primary};
        }
        
        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 30px;
        }
        
        .action-button {
          display: inline-block;
          padding: 12px 20px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 600;
          text-align: center;
          font-size: 14px;
        }
        
        .primary-button {
          background-color: ${colors.primary};
          color: white;
        }
        
        .secondary-button {
          background-color: ${colors.lightGray};
          color: ${colors.secondary};
          border: 1px solid ${colors.midGray};
        }
        
        .email-footer {
          background-color: ${colors.lightGray};
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: ${colors.darkGray};
        }
        
        @media only screen and (max-width: 480px) {
          .email-container {
            width: 100%;
            border-radius: 0;
          }
          
          .applicant-snapshot {
            flex-direction: column;
          }
          
          .action-buttons {
            flex-direction: column;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <div class="application-badge">New Application Received</div>
          <h1 class="email-heading">Job Application: ${data.positionName}</h1>
        </div>
        
        <div class="email-content">
          <div class="applicant-snapshot">
            <div class="applicant-info">
              <h2 class="applicant-name">${data.name}</h2>
              <p class="applicant-position">${data.positionName}</p>
              
              <div class="applicant-detail">
                <span class="detail-icon">✉️</span>
                <span>${data.email}</span>
              </div>
              
              <div class="applicant-detail">
                <span class="detail-icon">📞</span>
                <span>${data.phone}</span>
              </div>
              
              <div class="applicant-detail">
                <span class="detail-icon">👥</span>
                <span><a href="${data.linkedin}" style="color: ${colors.primary};">${data.linkedin}</a></span>
              </div>
              
              <div class="applicant-detail">
                <span class="detail-icon">🕒</span>
                <span>Received: ${new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</span>
              </div>
            </div>
          </div>
          
          <div class="application-section">
            <h3 class="section-title">Applicant's Message</h3>
            <div class="application-message">
              ${formattedMessage}
            </div>
          </div>
          
          <div class="action-buttons">
            <a href="mailto:${data.email}" class="action-button primary-button">Contact Applicant</a>
            <a href="${companyInfo.website}/admin/applications" class="action-button secondary-button">View in ATS</a>
            <a href="${companyInfo.website}/admin/applications/reject" class="action-button secondary-button">Reject Application</a>
          </div>
        </div>
        
        <div class="email-footer">
          <div>
            This is an automated message from the ${companyInfo.name} recruitment system.<br>
            Please do not reply directly to this email.
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
