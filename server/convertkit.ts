import axios from 'axios';

interface ConvertKitSubscriber {
  id: number;
  first_name?: string;
  email_address: string;
  state: 'active' | 'inactive' | 'cancelled';
  created_at: string;
  fields: Record<string, any>;
  tags?: Array<{
    id: number;
    name: string;
  }>;
}

interface ConvertKitForm {
  id: number;
  name: string;
  description: string;
  embed_js: string;
  embed_url: string;
  title: string;
  uid: string;
  created_at: string;
}

interface ConvertKitTag {
  id: number;
  name: string;
  created_at: string;
}

class ConvertKitAPI {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl = 'https://api.convertkit.com/v3';

  constructor() {
    this.apiKey = process.env.CONVERTKIT_API_KEY || '';
    this.apiSecret = process.env.CONVERTKIT_API_SECRET || '';
    
    if (!this.apiKey || !this.apiSecret) {
      console.warn('ConvertKit API credentials not found in environment variables');
      console.warn('CONVERTKIT_API_KEY present:', !!process.env.CONVERTKIT_API_KEY);
      console.warn('CONVERTKIT_API_SECRET present:', !!process.env.CONVERTKIT_API_SECRET);
    } else {
      console.log('ConvertKit API credentials loaded successfully');
    }
  }

  // Add subscriber to ConvertKit using form (required in V3)
  async addSubscriber(email: string, firstName?: string, tags?: string[]): Promise<ConvertKitSubscriber | null> {
    try {
      console.log('Adding subscriber to ConvertKit');
      
      if (!this.apiKey) {
        console.error('ConvertKit API key is missing');
        return null;
      }

      // First, get available forms or create one if none exist
      let forms = [];
      try {
        forms = await this.getForms();
      } catch (formsError) {
        console.log('Failed to fetch forms from ConvertKit:', formsError.message);
        return null;
      }

      let formId: number;

      if (forms.length === 0) {
        console.log('No forms found, trying to create a default newsletter form...');
        try {
          const newForm = await this.createForm('Newsletter Signup', 'Subscribe to our newsletter for the latest AI policy updates.');
          if (!newForm) {
            console.error('Failed to create form for subscriber addition');
            return null;
          }
          formId = newForm.id;
        } catch (createFormError) {
          console.log('Form creation failed, ConvertKit API does not support form creation with current plan:', createFormError.message);
          return null;
        }
      } else {
        // Use the first available form
        formId = forms[0].id;
        console.log('Using existing form:', forms[0].name, 'ID:', formId);
      }

      // Add subscriber to form using ConvertKit V3 API
      const data = {
        api_key: this.apiKey,
        email: email,
        ...(firstName && { first_name: firstName })
      };

      console.log('ConvertKit form subscription data:', { ...data, api_key: '[REDACTED]', formId });

      const response = await axios.post(
        `${this.baseUrl}/forms/${formId}/subscribe`,
        data
      );

      console.log('ConvertKit response status:', response.status);
      console.log('ConvertKit response data:', response.data);

      return response.data.subscription;
    } catch (error) {
      console.error('Error adding subscriber to ConvertKit:', error);
      if (axios.isAxiosError(error)) {
        console.error('ConvertKit API error status:', error.response?.status);
        console.error('ConvertKit API error data:', error.response?.data);
      }
      return null;
    }
  }

  // Create a new form in ConvertKit
  async createForm(name: string, description: string): Promise<ConvertKitForm | null> {
    try {
      if (!this.apiKey) {
        console.error('ConvertKit API key is missing');
        return null;
      }

      const data = {
        api_key: this.apiKey,
        name: name,
        description: description
      };

      const response = await axios.post(
        `${this.baseUrl}/forms`,
        data
      );

      console.log('Created ConvertKit form:', response.data);
      return response.data.form;
    } catch (error) {
      console.error('Error creating ConvertKit form:', error);
      if (axios.isAxiosError(error)) {
        console.error('ConvertKit form creation error:', error.response?.data);
      }
      return null;
    }
  }

  // Get subscriber by email
  async getSubscriber(email: string): Promise<ConvertKitSubscriber | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/subscribers`,
        {
          params: {
            api_secret: this.apiSecret,
            email_address: email
          }
        }
      );

      const subscribers = response.data.subscribers;
      return subscribers.length > 0 ? subscribers[0] : null;
    } catch (error) {
      console.error('Error getting subscriber from ConvertKit:', error);
      return null;
    }
  }

  // Get total subscriber count
  async getSubscriberCount(): Promise<number> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/subscribers`,
        {
          params: {
            api_secret: this.apiSecret
          }
        }
      );

      return response.data.total_subscribers || 0;
    } catch (error) {
      console.error('Error getting subscriber count from ConvertKit:', error);
      throw error; // Re-throw error to trigger fallback logic
    }
  }

  // Get all subscribers with pagination
  async getSubscribers(page: number = 1): Promise<{
    subscribers: ConvertKitSubscriber[];
    total: number;
    page: number;
    total_pages: number;
  }> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/subscribers`,
        {
          params: {
            api_secret: this.apiSecret,
            page: page
          }
        }
      );

      return {
        subscribers: response.data.subscribers || [],
        total: response.data.total_subscribers || 0,
        page: response.data.page || 1,
        total_pages: response.data.total_pages || 1
      };
    } catch (error) {
      console.error('Error getting subscribers from ConvertKit:', error);
      throw error; // Re-throw error to trigger fallback logic
    }
  }

  // Unsubscribe a subscriber
  async unsubscribeSubscriber(email: string): Promise<boolean> {
    try {
      await axios.put(
        `${this.baseUrl}/unsubscribe`,
        {
          api_secret: this.apiSecret,
          email: email
        }
      );

      return true;
    } catch (error) {
      console.error('Error unsubscribing from ConvertKit:', error);
      return false;
    }
  }

  // Get all forms
  async getForms(): Promise<ConvertKitForm[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/forms`,
        {
          params: {
            api_key: this.apiKey
          }
        }
      );

      return response.data.forms || [];
    } catch (error) {
      console.error('Error getting forms from ConvertKit:', error);
      return [];
    }
  }

  // Add subscriber to a specific form
  async addSubscriberToForm(formId: number, email: string, firstName?: string): Promise<ConvertKitSubscriber | null> {
    try {
      const data = {
        api_key: this.apiKey,
        email: email,
        ...(firstName && { first_name: firstName })
      };

      const response = await axios.post(
        `${this.baseUrl}/forms/${formId}/subscribe`,
        data
      );

      return response.data.subscription;
    } catch (error) {
      console.error('Error adding subscriber to form in ConvertKit:', error);
      return null;
    }
  }

  // Get all tags
  async getTags(): Promise<ConvertKitTag[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/tags`,
        {
          params: {
            api_key: this.apiKey
          }
        }
      );

      return response.data.tags || [];
    } catch (error) {
      console.error('Error getting tags from ConvertKit:', error);
      return [];
    }
  }

  // Add tag to subscriber
  async addTagToSubscriber(email: string, tagId: number): Promise<boolean> {
    try {
      await axios.post(
        `${this.baseUrl}/tags/${tagId}/subscribe`,
        {
          api_key: this.apiKey,
          email: email
        }
      );

      return true;
    } catch (error) {
      console.error('Error adding tag to subscriber in ConvertKit:', error);
      return false;
    }
  }

  // Remove tag from subscriber
  async removeTagFromSubscriber(email: string, tagId: number): Promise<boolean> {
    try {
      await axios.post(
        `${this.baseUrl}/tags/${tagId}/unsubscribe`,
        {
          api_key: this.apiKey,
          email: email
        }
      );

      return true;
    } catch (error) {
      console.error('Error removing tag from subscriber in ConvertKit:', error);
      return false;
    }
  }

  // Check if API credentials are valid
  async validateCredentials(): Promise<boolean> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/account`,
        {
          params: {
            api_key: this.apiKey,
            api_secret: this.apiSecret
          }
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error('ConvertKit credentials validation failed:', error);
      return false;
    }
  }
}

export const convertKit = new ConvertKitAPI();
export type { ConvertKitSubscriber, ConvertKitForm, ConvertKitTag };