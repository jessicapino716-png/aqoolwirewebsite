import sgMail from '@sendgrid/mail';

let connectionSettings: any;

async function getCredentials() {
  // Check if direct API key is provided (bypasses connector caching)
  if (process.env.SENDGRID_API_KEY_NEW) {
    console.log('Using direct SendGrid API key from environment variable');
    return {
      apiKey: process.env.SENDGRID_API_KEY_NEW,
      email: 'jessicapino@theaqoolwire.com'
    };
  }

  // Fallback to connector API
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  console.log('Fetching SendGrid credentials from connector API...');
  const response = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  );
  
  const data = await response.json();
  console.log('Connector API response status:', response.status);
  console.log('Number of connections found:', data.items?.length || 0);
  
  connectionSettings = data.items?.[0];

  if (!connectionSettings || (!connectionSettings.settings.api_key || !connectionSettings.settings.from_email)) {
    throw new Error('SendGrid not connected');
  }
  
  console.log('SendGrid connection found - from email:', connectionSettings.settings.from_email);
  return {apiKey: connectionSettings.settings.api_key, email: connectionSettings.settings.from_email};
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableSendGridClient() {
  const {apiKey, email} = await getCredentials();
  console.log('SendGrid credentials fetched - from email:', email, 'API key prefix:', apiKey?.substring(0, 10) + '...');
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
}
