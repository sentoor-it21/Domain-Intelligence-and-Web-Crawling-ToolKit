import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DomainController extends Controller {
  @tracked email = '';
  @tracked domain = '';
  @tracked loading = false;
  @tracked error = '';
  @tracked screenshotBase64 = '';
  @tracked emailStatus = '';
  @tracked domainInfo = null;
  @tracked contactInfo = null;
  @tracked comInfo = null;

  // Prompt for domain classification
  get domainClassifierPrompt() {
    return `You are a domain classifier specialist. Based on the HTML content of a website, analyze and classify the domain.
Analyze the following company: CoreView

Return the following structured information:

1. Industry: [Specific category like "Technology Hardware & Equipment", "Healthcare", "Finance", etc.]
2. Location: [Country name like "India", "Germany", etc.]
3. Google Popularity: [High, Medium, or Low]
4. Trust Score: [Numerical score out of 100]
5. Competitor for AdminDroid: [Yes or No]
6. Rank: [Numerical value]

Note: AdminDroid is a Microsoft 365 reporting and analytics tool used by IT administrators to generate reports on Exchange Online, Azure AD, Teams, SharePoint, etc. A competitor would be a company that also provides analytics, reporting, monitoring, or admin tools for Microsoft 365.

Answer only based on actual business overlap and target audience.
 

Format your response exactly like this (with no additional text, just the answers):
Industry: Technology Hardware & Equipment
Location: India
Popularity: High
TrustScore: 82
Competitor: No
Rank: 7573`;
  }

  get contactInfoPrompt() {
    return `You are an expert at extracting contact information from websites. Given the HTML of a contact page, extract:

1. Support email addresses
2. Phone numbers for support or general inquiries
3. Contact form availability (Yes/No)

Format your response exactly like this (with no additional text, just the answers):
SupportEmail: support@example.com
SupportPhone: +1-555-123-4567
ContactForm: Yes

If any information is not found, write "None" for that field.`;
  }

  @action
  async parseEmail() {
    this.error = '';
    this.domainInfo = null;
    this.contactInfo = null;
    this.domain = '';
    this.screenshotBase64 = '';
    this.emailStatus = '';
    this.loading = true;
    this.comInfo = null;

    if (!this.email || !this.email.includes('@')) {
      this.error = 'Please enter a valid email address.';
      this.loading = false;
      return;
    }

    try {
      await this.validateEmail(true);

      let domain = this.email.split('@')[1];
      this.domain = domain;

      let homePageResponse = await fetch(
        `https://localhost:7242/api/website/html?url=${domain}`,
      );
      let homeHtml = await homePageResponse.text();

      await this.analyzeDomain(homeHtml);

      try {
        let contactPageResponse = await fetch(
          `https://localhost:7242/api/website/html?url=${domain}/contact-us`,
        );
        let contactHtml = await contactPageResponse.text();

        if (!contactPageResponse.ok) {
          contactPageResponse = await fetch(
            `https://localhost:7242/api/website/html?url=${domain}`,
          );
          contactHtml = await contactPageResponse.text();
        }

        if (contactPageResponse.ok) {
          await this.extractContactInfo(contactHtml);
        }
      } catch (contactError) {
        console.log(
          'Contact page not found or could not be accessed',
          contactError,
        );
      }

      const screenshotResponse = await fetch(
        `https://localhost:7242/api/website/full-screenshot?url=https://${domain}`,
      );
      if (screenshotResponse.ok) {
        this.screenshotBase64 = await screenshotResponse.text();
      }
    } catch (e) {
      this.error = 'Failed to fetch details: ' + e.message;
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async analyzeDomain(html) {
    const prompt = `${this.domainClassifierPrompt}\n\n${html.slice(0, 99000)}`;

    let aiResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: [{ role: 'user', content: prompt }],
        }),
      },
    );

    let output = await aiResponse.json();
    let analysisText = output.choices[0].message.content.trim() || 'No Data';

    this.domainInfo = this.parseAnalysisResponse(analysisText);
  }

  async extractContactInfo(html) {
    const prompt = `${this.contactInfoPrompt}\n\n${html.slice(0, 99000)}`;

    let aiResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: [{ role: 'user', content: prompt }],
        }),
      },
    );

    let output = await aiResponse.json();
    let contactText = output.choices[0].message.content.trim() || 'No Data';

    this.contactInfo = this.parseContactResponse(contactText);
  }

  parseAnalysisResponse(text) {
    const lines = text.split('\n');
    const result = {};

    lines.forEach((line) => {
      if (line.includes(':')) {
        const [key, value] = line.split(':').map((item) => item.trim());

        if (key.toLowerCase().includes('industry')) {
          result.industry = value;
        } else if (key.toLowerCase().includes('location')) {
          result.location = value;
        } else if (key.toLowerCase().includes('popularity')) {
          result.popularity = value;
        } else if (key.toLowerCase().includes('trustscore')) {
          result.trustScore = value;
        } else if (key.toLowerCase().includes('competitor')) {
          result.isCompetitor = value;
        } else if (key.toLowerCase().includes('rank')) {
          result.rank = value;
        }
      }
    });

    return result;
  }

  parseContactResponse(text) {
    const lines = text.split('\n');
    const result = {};

    lines.forEach((line) => {
      if (line.includes(':')) {
        const [key, value] = line.split(':').map((item) => item.trim());

        if (key.toLowerCase().includes('supportemail')) {
          result.email = value !== 'None' ? value : null;
        } else if (key.toLowerCase().includes('supportphone')) {
          result.phone = value !== 'None' ? value : null;
        } else if (key.toLowerCase().includes('contactform')) {
          result.hasContactForm = value === 'Yes';
        }
      }
    });

    return result;
  }

  @action
  async validateEmail(silent = false) {
    if (!silent) {
      this.emailStatus = '';
    }

    if (!this.email || !this.email.includes('@')) {
      this.emailStatus = 'Please enter a valid email address first.';
      return;
    }
    try {
      let response = await fetch(
        `https://localhost:7242/api/website/validate-email?email=${encodeURIComponent(this.email)}`,
      );
      let message = await response.text();
      this.emailStatus = message;
    } catch (e) {
      this.emailStatus = 'Error validating email: ' + e.message;
      console.error(e);
    }
  }
}
